import {LockClosedIcon} from '@heroicons/react/solid'
import SISTitle from "../../../public/components/page-titles";
import {useState} from "react";
import {useRouter} from "next/router";
import ProcessNotification from "../../../public/notifications/process";
import FailNotification from "../../../public/notifications/fail";
import SisOfficerStorage from "../../../public/storage/officer/SisOfficerStorage";
import OfficerController from "../../../public/api/officer/OfficerController";
import LoginController from "../../../public/api/login/LoginController";
import {EyeIcon, EyeOffIcon} from "@heroicons/react/outline";

export default function OfficerLogin() {

    let [isOpenProcessingLoginNotification, setIsOpenProcessingLoginNotification] = useState(false);

    function closeProcessingLoginNotification() {
        setIsOpenProcessingLoginNotification(false);
    }

    function openProcessingLoginNotification() {
        setIsOpenProcessingLoginNotification(true);
    }

    let [isOpenFailLoginNotification, setIsOpenFailLoginNotification] = useState(false);

    function closeFailLoginNotification() {
        setIsOpenFailLoginNotification(false);
    }

    function openFailLoginNotification() {
        setIsOpenFailLoginNotification(true);
    }


    const router = useRouter();

    const [officerNumber, setOfficerNumber] = useState();
    const changeOfficerNumber = event => {
        const officerNumber = event.target.value;
        setOfficerNumber(officerNumber);
    }

    const [password, setPassword] = useState();
    const changePassword = event => {
        const password = event.target.value;
        setPassword(password);
    }

    const officerLogin = async (event) => {
        openProcessingLoginNotification();

        event.preventDefault();

        const loginData = await LoginController.officerLogin(officerNumber, password);
        if (loginData.success && loginData.response.loginSuccess) {

            const officerData = await OfficerController.getOfficerDetailByOfficerId(officerNumber);
            if (officerData.success) {
                await SisOfficerStorage.saveData(officerData.response);
                closeProcessingLoginNotification();
                await router.push("/officer");
            }
        }
        closeProcessingLoginNotification();
        openFailLoginNotification();
    }


    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const showPassword = () => {
        setIsPasswordShow(!isPasswordShow);
    }

    return (
        <div className="bg-sis-gray h-screen">
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <SISTitle/>
                <div className="sm:mt-0">
                    <img
                        className="h-28 w-auto mb-16"
                        src="https://i.hizliresim.com/em7bd2l.png"
                        alt="Workflow"
                    />
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="md:col-span-1 ">
                                <div className="px-4 sm:px-0">
                                </div>
                            </div>
                            <form className="px-4 max-w-2xl mx-auto space-y-6" onSubmit={officerLogin}>

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <h2 className="mt-8 font-phenomenaExtraBold text-center text-5xl text-sis-darkblue mb-6">
                                            PERSONEL G??R??????
                                        </h2>
                                    </div>
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-1 gap-6">

                                            <div className="sm:col-span-1">
                                                <label htmlFor="first-name"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    PERSONEL NUMARASI
                                                </label>
                                                <input
                                                    onChange={changeOfficerNumber}
                                                    id="officer-number"
                                                    name="officer-number"
                                                    type="text"
                                                    autoComplete="current-username"
                                                    minLength="5"
                                                    maxLength="5"
                                                    required
                                                    pattern="[0-9]+"
                                                    className="font-phenomenaRegular text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                />
                                            </div>

                                            <div className="sm:col-span-1">
                                                <label htmlFor="password"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    ????FRE
                                                </label>
                                                <div className="relative w-full">
                                                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                                        {
                                                            isPasswordShow
                                                                ?
                                                                <EyeIcon
                                                                    className="h-6 w-8 text-sis-yellow group-hover:text-sis-yellow cursor-pointer"
                                                                    onClick={showPassword}
                                                                    aria-hidden="true" htmlFor="password"/>
                                                                :
                                                                <EyeOffIcon
                                                                    className="h-6 w-8 text-sis-yellow group-hover:text-sis-yellow cursor-pointer"
                                                                    onClick={showPassword}
                                                                    aria-hidden="true" htmlFor="password"/>
                                                        }
                                                    </div>
                                                    <input
                                                        onChange={changePassword}
                                                        id="password"
                                                        name="password"
                                                        type={isPasswordShow ? "text" : "password"}
                                                        autoComplete="password"
                                                        required
                                                        className={
                                                            isPasswordShow
                                                                ?
                                                                "font-phenomenaRegular text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                                :
                                                                "text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="px-4 py-3 text-right sm:px-6">
                                        <div>
                                            <button
                                                type="submit"
                                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sis-yellow hover:bg-sis-yellow"
                                            >
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                <LockClosedIcon
                                                    className="h-5 w-5 text-sis-white group-hover:text-sis-white"
                                                    aria-hidden="true"/>
                                            </span>
                                                <a className="font-phenomenaBold text-lg">Giri?? Yap</a>
                                            </button>
                                        </div>

                                        <div className="text-sm text-center mt-2">
                                            <a href="/login/officer/forgot-password"
                                               className="font-phenomenaBold text-lg text-sis-darkblue hover:text-sis-yellow">
                                                ??ifrenizi mi unuttunuz?
                                            </a>
                                        </div>


                                        <ProcessNotification
                                            isOpen={isOpenProcessingLoginNotification}
                                            closeNotification={closeProcessingLoginNotification}
                                            title="Giri?? Yap??l??yor..."
                                        />

                                        <FailNotification
                                            isOpen={isOpenFailLoginNotification}
                                            closeNotification={closeFailLoginNotification}
                                            title="Personel Numaran??z veya ??ifreniz Yanl????!"
                                            description="Personel Numaran??z?? veya ??ifrenizi kontrol ediniz.
                                            ??ifrenizi hat??rlam??yorsan??z ??ifremi unuttum ekran??ndan s??f??rlayabilirsiniz."
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
