import SISTitle from "../../../../public/components/page-titles";
import {FingerPrintIcon} from "@heroicons/react/outline";
import {useState} from "react";
import ProcessNotification from "../../../../public/notifications/process";
import SuccessNotification from "../../../../public/notifications/success";
import FailNotification from "../../../../public/notifications/fail";
import {useRouter} from "next/router";
import TeacherPasswordOperationController
    from "../../../../public/api/teacher/password/TeacherPasswordOperationController";

export async function getServerSideProps() {
    return {
        props: {
            SIS_API_URL: process.env.SIS_API_URL,
            SIS_FE_URL: process.env.SIS_FE_URL
        }
    }
}


export default function TeacherForgotPassword({SIS_API_URL, SIS_FE_URL}) {

    const router = useRouter();

    let [isOpenProcessingForgotPasswordNotification, setIsOpenProcessingForgotPasswordNotification] = useState(false);

    function closeProcessingForgotPasswordNotification() {
        setIsOpenProcessingForgotPasswordNotification(false);
    }

    function openProcessingForgotPasswordNotification() {
        setIsOpenProcessingForgotPasswordNotification(true);
    }

    let [isOpenSuccessForgotPasswordNotification, setIsOpenSuccessForgotPasswordNotification] = useState(false);

    function closeSuccessForgotPasswordNotification() {
        setIsOpenSuccessForgotPasswordNotification(false);
        router.push("/login/teacher");
    }

    function openSuccessForgotPasswordNotification() {
        setIsOpenSuccessForgotPasswordNotification(true);
    }

    let [isOpenFailForgotPasswordNotification, setIsOpenFailForgotPasswordNotification] = useState(false);

    function closeFailForgotPasswordNotification() {
        setIsOpenFailForgotPasswordNotification(false);
    }

    function openFailForgotPasswordNotification() {
        setIsOpenFailForgotPasswordNotification(true);
    }

    const [teacherNumber, setTeacherNumber] = useState();
    const changeTeacherNumber = event => {
        const teacherNumber = event.target.value;
        setTeacherNumber(teacherNumber);
    }

    const teacherForgotPassword = async (event) => {
        openProcessingForgotPasswordNotification();

        event.preventDefault();

        const data = await TeacherPasswordOperationController.forgotPassword(teacherNumber);
        if (!data.success) {
            closeProcessingForgotPasswordNotification();
            openFailForgotPasswordNotification();
        } else if (data.response.forgotPasswordSuccess) {
            closeProcessingForgotPasswordNotification();
            openSuccessForgotPasswordNotification();
        } else {
            closeProcessingForgotPasswordNotification();
            openFailForgotPasswordNotification();
        }
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
                            <form className="px-4 max-w-2xl mx-auto space-y-6" onSubmit={teacherForgotPassword}>

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <h2 className="mt-8 font-phenomenaExtraBold text-center text-5xl text-sis-darkblue mb-6">
                                            ŞİFREMİ UNUTTUM
                                        </h2>
                                    </div>
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-1 gap-6">
                                            <div className="sm:col-span-1">
                                                <label htmlFor="first-name"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    ÖĞRETMEN NUMARASI
                                                </label>
                                                <input
                                                    onChange={changeTeacherNumber}
                                                    id="teacher-number"
                                                    name="teacher-number"
                                                    type="text"
                                                    autoComplete="current-username"
                                                    minLength="8"
                                                    maxLength="8"
                                                    required
                                                    pattern="[0-9]+"
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
                                                <a className="font-phenomenaBold text-lg">Yeni Şifre Gönder</a>
                                            </button>
                                        </div>
                                    </div>


                                    <ProcessNotification
                                        isOpen={isOpenProcessingForgotPasswordNotification}
                                        closeNotification={closeProcessingForgotPasswordNotification}
                                        title="Şifremi Değiştirme Maili Gönderiliyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessForgotPasswordNotification}
                                        closeNotification={closeSuccessForgotPasswordNotification}
                                        title="Şifre Değiştirme İsteğiniz Başarılı!"
                                        description="Mail Adresinize gönderilen şifre ile hesabınıza giriş yapabilirsiniz."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailForgotPasswordNotification}
                                        closeNotification={closeFailForgotPasswordNotification}
                                        title="Şifre Değiştirme İsteğiniz Başarısız!"
                                        description="Öğretmen Numaranızı kontrol ediniz.
                                        Öğretmen Numaranızı doğru girdiyseniz sistemsel bir
                                        hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
