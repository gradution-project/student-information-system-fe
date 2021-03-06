import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import SisOfficerStorage from "../../../../../public/storage/officer/SisOfficerStorage";
import UnauthorizedAccessPage from "../../../../401";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";
import FacultyController from "../../../../../public/api/faculty/FacultyController";
import SisOperationButton from "../../../../../public/components/buttons/SisOperationButton";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    return {
        props: {
            isPagePermissionSuccess: true,
            operationUserId: officerId
        }
    }
}

export default function FacultySave({isPagePermissionSuccess, operationUserId}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    let [isOpenSuccessSaveNotification, setIsOpenSuccessSaveNotification] = useState(false);

    function closeSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(false);
        router.push("/officer/operation/faculty").then(() => router.reload());
    }

    function openSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(true);
    }

    let [isOpenFailSaveNotification, setIsOpenFailSaveNotification] = useState(false);

    function closeFailSaveNotification() {
        setIsOpenFailSaveNotification(false);
    }

    function openFailSaveNotification() {
        setIsOpenFailSaveNotification(true);
    }

    let [isOpenProcessingSaveNotification, setIsOpenProcessingSaveNotification] = useState(false);

    function closeProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(false);
    }

    function openProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(true);
    }


    const [facultyName, setFacultyName] = useState();
    const changeFacultyName = event => {
        setFacultyName(event.target.value.toLocaleUpperCase('tr-TR'));
    }

    const facultySave = async (event) => {
        openProcessingSaveNotification();

        event.preventDefault();

        const facultyData = await FacultyController.saveFaculty(operationUserId, facultyName);
        if (facultyData.success) {
            closeProcessingSaveNotification();
            openSuccessSaveNotification();
        } else {
            closeProcessingSaveNotification();
            openFailSaveNotification();
        }
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="select-none mt-10 py-4 sm:mt-0">
                <form className="mt-5 px-4 max-w-3xl mx-auto space-y-6" onSubmit={facultySave}>
                    <div className="shadow sm:rounded-md sm:overflow-hidden">
                        <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                    FAK??LTE EKLEME
                                </h3>
                            </div>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="faculty-name"
                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                        FAK??LTE ADI
                                    </label>
                                    <input
                                        onChange={changeFacultyName}
                                        type="text"
                                        name="name"
                                        id="name"
                                        autoComplete="faculty-name"
                                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            {SisOperationButton.getSaveButton("KAYDET")}
                        </div>

                        <ProcessNotification
                            isOpen={isOpenProcessingSaveNotification}
                            closeNotification={closeProcessingSaveNotification}
                            title="Fak??lte Ekleme ??ste??iniz ????leniyor..."
                        />

                        <SuccessNotification
                            isOpen={isOpenSuccessSaveNotification}
                            closeNotification={closeSuccessSaveNotification}
                            title="Fak??lte Ekleme ????lemi Ba??ar??l??!"
                            description="Fak??lte Ekleme ????lemi ba??ar??yla ger??ekle??ti.
                            Mesaj penceresini kapatt??ktan sonra fak??lte listeleme ekran??na y??nlendirileceksiniz."
                        />

                        <FailNotification
                            isOpen={isOpenFailSaveNotification}
                            closeNotification={closeFailSaveNotification}
                            title="Fak??lte Ekleme ????lemi Ba??ar??s??z!"
                            description="L??tfen girdi??iniz verileri kontrol ediniz.
                            Verilerinizi do??ru girdiyseniz
                            sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}