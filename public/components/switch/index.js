import {useState} from 'react'
import {Switch} from '@headlessui/react'
import FeatureToggleController from "../../api/university/FeatureToggleController";
import {useRouter} from "next/router";
import ProcessNotification from "../../notifications/process";

export default function FeatureToggleSwitch({isToggleEnabled, operationUserId, toggleName}) {

    const router = useRouter()

    let [isOpenProcessingNotification, setIsOpenProcessingNotification] = useState(false);

    function closeProcessingNotification() {
        setIsOpenProcessingNotification(false);
    }

    function openProcessingNotification() {
        setIsOpenProcessingNotification(true);
    }

    const [isEnabled, setToggleStatus] = useState(isToggleEnabled)

    const updateToggleStatus = async () => {
        openProcessingNotification()
        if (isEnabled) {
            await FeatureToggleController.disableFeatureToggle(operationUserId, toggleName);
            setToggleStatus(false)
            router.reload()
        } else {
            await FeatureToggleController.enableFeatureToggle(operationUserId, toggleName);
            setToggleStatus(true)
            router.reload()
        }
    }

    return (
        <Switch
            checked={isEnabled}
            onChange={updateToggleStatus}
            className={`${
                isEnabled ? 'bg-sis-success' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11`}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${
                    isEnabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
            <ProcessNotification
                isOpen={isOpenProcessingNotification}
                closeNotification={closeProcessingNotification}
                title="İsteğiniz İşleniyor..."
            />
        </Switch>
    )
}
