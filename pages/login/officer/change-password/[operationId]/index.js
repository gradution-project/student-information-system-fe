import {FingerPrintIcon} from "@heroicons/react/outline";
import {useState} from "react";
import {useRouter} from "next/router";
import SISTitle from "../../../../../public/components/page-titles";
import FailNotification from "../../../../../public/notifications/fail";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import PageNotFound from "../../../../404";

export async function getServerSideProps({query}) {
    const SIS_API_URL = process.env.SIS_API_URL;
    const {operationId} = query;
    const passwordOperationResponse = await fetch(`${SIS_API_URL}/officer/password-operation?operationId=${operationId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const passwordOperationData = await passwordOperationResponse.json();
    return {
        props: {
            isDataFound: passwordOperationData.success,
            SIS_API_URL: SIS_API_URL,
            operationId: operationId
        }
    }
}

export default function OfficerChangePassword({isDataFound, SIS_API_URL, operationId}) {

    if (!isDataFound) {
        return (
            <PageNotFound user=""/>
        )
    }

    const router = useRouter();

    let [isOpenProcessingNotification, setIsOpenProcessingNotification] = useState(false);

    function closeProcessingNotification() {
        setIsOpenProcessingNotification(false);
    }

    function openProcessingNotification() {
        setIsOpenProcessingNotification(true);
    }


    let [isOpenSuccessNotification, setIsOpenSuccessNotification] = useState(false);

    function closeSuccessNotification() {
        setIsOpenSuccessNotification(false);
        router.push("/login/officer");
    }

    function openSuccessNotification() {
        setIsOpenSuccessNotification(true);
    }


    let [isOpenFailNotification, setIsOpenFailNotification] = useState(false);

    function closeFailNotification() {
        setIsOpenFailNotification(false);
    }

    function openFailNotification() {
        setIsOpenFailNotification(true);
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

    const officerChangePassword = async (event) => {
        openProcessingNotification();

        event.preventDefault();

        if (newPassword === newPasswordRepeat) {
            const res = await fetch(`${SIS_API_URL}/officer/password-operation/change-password`, {
                body: JSON.stringify({
                    operationId: operationId,
                    newPassword: newPassword,
                    newPasswordRepeat: newPasswordRepeat
                }),
                headers: {'Content-Type': 'application/json'},
                method: 'POST'
            });
            const data = await res.json();
            if (!data.success) {
                closeProcessingNotification();
                openFailNotification();
            } else if (data.response.passwordChanged) {
                closeProcessingNotification();
                openSuccessNotification();
            } else {
                closeProcessingNotification();
                openFailNotification();
            }
        } else {
            closeProcessingNotification();
            openPasswordsNotMatchedNotification();
        }
    }

    return (
        <>
            <div className="bg-sis-gray h-screen">
                <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <SISTitle/>
                    <div className="sm:mt-0">
                        <img
                            className="h-28 w-auto mb-16"
                            src="https:i.hizliresim.com/em7bd2l.png"
                            alt="Workflow"
                        />
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="mt-5 md:mt-0 md:col-span-2">
                                <div className="md:col-span-1 ">
                                    <div className="px-4 sm:px-0">
                                    </div>
                                </div>
                                <form className="px-4 max-w-2xl mx-auto space-y-6"
                                      onSubmit={officerChangePassword}>

                                    <div className="shadow overflow-hidden sm:rounded-md">
                                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                            <h2 className="mt-8 font-phenomenaExtraBold text-center text-5xl text-sis-darkblue mb-6">
                                                ŞİFRE BELİRLEME
                                            </h2>
                                        </div>
                                        <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-1 gap-6">
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="first-name"
                                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                        YENİ ŞİFRE
                                                    </label>
                                                    <input
                                                        onChange={changeNewPassword}
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        required
                                                        className="font-phenomenaRegular text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                    />
                                                </div>
                                                <div className="sm:col-span-1">
                                                    <label htmlFor="first-name"
                                                           className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                        YENİ ŞİFRE (TEKRAR)
                                                    </label>
                                                    <input
                                                        onChange={changeNewPasswordRepeat}
                                                        id="password-repeat"
                                                        name="password-repeat"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        required
                                                        className="font-phenomenaRegular text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                    />
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
                                                            aria-hidden="true"/>
                                                    </span>
                                                    <a className="font-phenomenaBold text-lg">Yeni Şifreyi Kaydet</a>
                                                </button>
                                            </div>
                                        </div>


                                        <ProcessNotification
                                            isOpen={isOpenProcessingNotification}
                                            closeNotification={closeProcessingNotification}
                                            title="İsteğiniz İşleniyor..."
                                        />

                                        <SuccessNotification
                                            isOpen={isOpenSuccessNotification}
                                            closeNotification={closeSuccessNotification}
                                            title="Şifre Değiştirme İsteğiniz Başarılı!"
                                            description="Şifreniz başarılı bir şekilde değiştirildi.
                                            Belirlemiş olduğunuz şifre ile sisteme giriş yapabilirsiniz.
                                            Uyarı penceresini kapattıktan sonra giriş ekranına yönlendirileceksiniz."
                                        />

                                        <FailNotification
                                            isOpen={isOpenFailNotification}
                                            closeNotification={closeFailNotification}
                                            title="Şifre Değiştirme İsteğiniz Başarısız!"
                                            description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                        />

                                        <FailNotification
                                            isOpen={isOpenPasswordsNotMatched}
                                            closeNotification={closePasswordsNotMatchedNotification}
                                            title="Girmiş Olduğunuz Şifreler Eşleşmiyor!"
                                            description="Lütfen girdiğiniz şifreleri kontrol ediniz ve
                                            şifrelerin eşleştiğinden emin olunuz."
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
