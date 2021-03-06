import {EyeIcon, EyeOffIcon, FingerPrintIcon} from "@heroicons/react/outline";
import {useState} from "react";
import {useRouter} from "next/router";
import SISTitle from "../../../../../public/components/page-titles";
import PageNotFound from "../../../../404";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";
import StudentPasswordOperationController
    from "../../../../../public/api/student/password/StudentPasswordOperationController";

export async function getServerSideProps({query}) {
    const {operationId} = query;
    const passwordOperationData = await StudentPasswordOperationController.isPasswordChangeOperationEnabled(operationId);
    return {
        props: {
            isDataFound: passwordOperationData.success,
            operationId: operationId
        }
    }
}

export default function StudentForgotPassword({isDataFound, operationId}) {

    if (!isDataFound) {
        return (
            <PageNotFound user=""/>
        )
    }

    const router = useRouter();

    let [isOpenProcessingChangePasswordNotification, setIsOpenProcessingChangePasswordNotification] = useState(false);

    function closeProcessingChangePasswordNotification() {
        setIsOpenProcessingChangePasswordNotification(false);
    }

    function openProcessingChangePasswordNotification() {
        setIsOpenProcessingChangePasswordNotification(true);
    }


    let [isOpenSuccessChangePasswordNotification, setIsOpenSuccessChangePasswordNotification] = useState(false);

    function closeSuccessChangePasswordNotification() {
        setIsOpenSuccessChangePasswordNotification(false);
        router.push("/login/student");
    }

    function openSuccessChangePasswordNotification() {
        setIsOpenSuccessChangePasswordNotification(true);
    }


    let [isOpenFailChangePasswordNotification, setIsOpenFailChangePasswordNotification] = useState(false);

    function closeFailChangePasswordNotification() {
        setIsOpenFailChangePasswordNotification(false);
    }

    function openFailChangePasswordNotification() {
        setIsOpenFailChangePasswordNotification(true);
    }


    let [isOpenPasswordsNotMatched, setIsPasswordsNotMatched] = useState(false);

    function closePasswordsNotMatchedNotification() {
        setIsPasswordsNotMatched(false);
    }

    function openPasswordsNotMatchedNotification() {
        setIsPasswordsNotMatched(true);
    }


    const [newPassword, setNewPassword] = useState();
    const changeNewPassword = event => {
        const newPassword = event.target.value;
        setNewPassword(newPassword);
    }

    const [newPasswordRepeat, setNewPasswordRepeat] = useState();
    const changeNewPasswordRepeat = event => {
        const newPasswordRepeat = event.target.value;
        setNewPasswordRepeat(newPasswordRepeat);
    }

    const studentForgotPassword = async (event) => {
        openProcessingChangePasswordNotification();

        event.preventDefault();

        if (newPassword === newPasswordRepeat) {

            const data = await StudentPasswordOperationController.changePassword(operationId, newPassword, newPasswordRepeat);
            if (!data.success) {
                closeProcessingChangePasswordNotification();
                openFailChangePasswordNotification();
            } else if (data.response.passwordChanged) {
                closeProcessingChangePasswordNotification();
                openSuccessChangePasswordNotification();
            } else {
                closeProcessingChangePasswordNotification();
                openFailChangePasswordNotification();
            }
        } else {
            closeProcessingChangePasswordNotification();
            openPasswordsNotMatchedNotification();
        }
    }


    const [isNewPasswordShow, setIsNewPasswordShow] = useState(false);
    const showNewPassword = () => {
        setIsNewPasswordShow(!isNewPasswordShow);
    }


    const [isNewPasswordRepeatShow, setIsNewPasswordRepeatShow] = useState(false);
    const showNewPasswordRepeat = () => {
        setIsNewPasswordRepeatShow(!isNewPasswordRepeatShow);
    }

    return (
        <>
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
                                <form className="px-4 max-w-2xl mx-auto space-y-6"
                                      onSubmit={studentForgotPassword}>

                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <h2 className="mt-8 font-phenomenaExtraBold text-center text-5xl text-sis-darkblue mb-6">
                                                ????FRE BEL??RLEME
                                            </h2>
                                        </div>
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-1 gap-6">
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="password"
                                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                        YEN?? ????FRE
                                                    </label>
                                                    <div className="relative w-full">
                                                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                                            {
                                                                isNewPasswordShow
                                                                    ?
                                                                    <EyeIcon
                                                                        className="h-6 w-8 text-sis-yellow group-hover:text-sis-yellow cursor-pointer"
                                                                        onClick={showNewPassword}
                                                                        aria-hidden="true" htmlFor="password"/>
                                                                    :
                                                                    <EyeOffIcon
                                                                        className="h-6 w-8 text-sis-yellow group-hover:text-sis-yellow cursor-pointer"
                                                                        onClick={showNewPassword}
                                                                        aria-hidden="true" htmlFor="password"/>
                                                            }
                                                        </div>
                                                        <input
                                                            onChange={changeNewPassword}
                                                            id="password"
                                                            name="password"
                                                            type={isNewPasswordShow ? "text" : "password"}
                                                            autoComplete="password"
                                                            required
                                                            className={
                                                                isNewPasswordShow
                                                                    ?
                                                                    "font-phenomenaRegular text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                                    :
                                                                    "text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="password"
                                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                        YEN?? ????FRE (TEKRAR)
                                                    </label>
                                                    <div className="relative w-full">
                                                        <div className="absolute inset-y-0 right-0 flex items-center px-2">
                                                            {
                                                                isNewPasswordRepeatShow
                                                                    ?
                                                                    <EyeIcon
                                                                        className="h-6 w-8 text-sis-yellow group-hover:text-sis-yellow cursor-pointer"
                                                                        onClick={showNewPasswordRepeat}
                                                                        aria-hidden="true" htmlFor="password"/>
                                                                    :
                                                                    <EyeOffIcon
                                                                        className="h-6 w-8 text-sis-yellow group-hover:text-sis-yellow cursor-pointer"
                                                                        onClick={showNewPasswordRepeat}
                                                                        aria-hidden="true" htmlFor="password"/>
                                                            }
                                                        </div>
                                                        <input
                                                            onChange={changeNewPasswordRepeat}
                                                            id="password-repeat"
                                                            name="password-repeat"
                                                            type={isNewPasswordRepeatShow ? "text" : "password"}
                                                            autoComplete="password"
                                                            required
                                                            className={
                                                                isNewPasswordRepeatShow
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
                                                        <FingerPrintIcon
                                                            className="h-5 w-5 text-sis-white group-hover:text-sis-white"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                    <a className="font-phenomenaBold text-lg">Yeni ??ifreyi Kaydet</a>
                                                </button>
                                            </div>
                                        </div>

                                        <ProcessNotification
                                            isOpen={isOpenProcessingChangePasswordNotification}
                                            closeNotification={closeProcessingChangePasswordNotification}
                                            title="??ifre De??i??tirme ??ste??iniz ????leniyor..."
                                        />

                                        <SuccessNotification
                                            isOpen={isOpenSuccessChangePasswordNotification}
                                            closeNotification={closeSuccessChangePasswordNotification}
                                            title="??ifre De??i??tirme ??ste??iniz Ba??ar??l??!"
                                            description="??ifreniz ba??ar??l?? bir ??ekilde de??i??tirildi.
                                            Belirlemi?? oldu??unuz ??ifre ile sisteme giri?? yapabilirsiniz.
                                            Uyar?? penceresini kapatt??ktan sonra giri?? ekran??na y??nlendirileceksiniz."
                                        />

                                        <FailNotification
                                            isOpen={isOpenFailChangePasswordNotification}
                                            closeNotification={closeFailChangePasswordNotification}
                                            title="??ifre De??i??tirme ??ste??iniz Ba??ar??s??z!"
                                            description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                        />

                                        <FailNotification
                                            isOpen={isOpenPasswordsNotMatched}
                                            closeNotification={closePasswordsNotMatchedNotification}
                                            title="Girmi?? Oldu??unuz ??ifreler E??le??miyor!"
                                            description="L??tfen girdi??iniz ??ifreleri kontrol ediniz ve
                                            ??ifrelerin e??le??ti??inden emin olunuz."
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
