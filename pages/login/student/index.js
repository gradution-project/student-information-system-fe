import {LockClosedIcon} from '@heroicons/react/solid'
import SISTitle from "../../../public/components/page-titles";
import {useState} from "react";
import SisStudentStorage from "../../../public/storage/student/SisStudentStorage";
import ProcessNotification from "../../../public/notifications/process";
import FailNotification from "../../../public/notifications/fail";
import {useRouter} from "next/router";

export async function getServerSideProps() {
    return {
        props: {
            SIS_API_URL: process.env.SIS_API_URL
        }
    }
}

export default function StudentLogin({SIS_API_URL}) {

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

    const [studentNumber, setStudentNumber] = useState();
    const changeStudentNumber = event => {
        const studentNumber = event.target.value;
        setStudentNumber(studentNumber);
    }

    const [password, setPassword] = useState();
    const changePassword = event => {
        const password = event.target.value;
        setPassword(password);
    }

    const router = useRouter();

    const studentLogin = async (event) => {
        openProcessingLoginNotification();

        event.preventDefault();

        const loginRes = await fetch(`${SIS_API_URL}/login/student`, {
            body: JSON.stringify({studentId: studentNumber, password: password}),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });
        const loginData = await loginRes.json();
        if (loginData.response.loginSuccess) {
            const getRes = await fetch(`${SIS_API_URL}/student/` + studentNumber, {
                headers: {'Content-Type': 'application/json'},
                method: 'GET'
            });
            const getData = await getRes.json();
            if (getData.success) {
                await SisStudentStorage.saveData(getData.response);
                closeProcessingLoginNotification();
                await router.push("/student");
            }
        }
        closeProcessingLoginNotification();
        openFailLoginNotification();
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
                            <form className="px-4 max-w-2xl mx-auto space-y-6" onSubmit={studentLogin}>

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <h2 className="mt-8 font-phenomenaExtraBold text-center text-5xl text-sis-darkblue mb-6">ÖĞRENCİ
                                            GİRİŞİ</h2>
                                    </div>
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-1 gap-6">

                                            <div className="sm:col-span-1">
                                                <label htmlFor="first-name"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    ÖĞRENCİ NUMARASI
                                                </label>
                                                <input
                                                    onChange={changeStudentNumber}
                                                    id="student-number"
                                                    name="student-number"
                                                    type="text"
                                                    autoComplete="current-username"
                                                    minLength="12"
                                                    maxLength="12"
                                                    required
                                                    pattern="[0-9]+"
                                                    className="font-phenomenaRegular text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                />
                                            </div>

                                            <div className="sm:col-span-1">
                                                <label htmlFor="last-name"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    ŞİFRE
                                                </label>
                                                <input
                                                    onChange={changePassword}
                                                    id="password"
                                                    name="password"
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
                                                <LockClosedIcon
                                                    className="h-5 w-5 text-sis-white group-hover:text-sis-white"
                                                    aria-hidden="true"/>
                                            </span>
                                                <a className="font-phenomenaBold text-lg">Giriş Yap</a>
                                            </button>
                                        </div>

                                        <div className="text-sm text-center mt-2">
                                            <a href="/login/student/forgot-password"
                                               className="font-phenomenaBold text-lg text-sis-darkblue hover:text-sis-yellow">
                                                Şifrenizi mi unuttunuz?
                                            </a>
                                        </div>


                                        <ProcessNotification
                                            isOpen={isOpenProcessingLoginNotification}
                                            closeNotification={closeProcessingLoginNotification}
                                            title="Giriş Yapılıyor..."
                                        />

                                        <FailNotification
                                            isOpen={isOpenFailLoginNotification}
                                            closeNotification={closeFailLoginNotification}
                                            title="Öğrenci Numaranız veya Şifreniz Yanlış!"
                                            description="Öğrenci Numaranızı veya Şifrenizi kontrol ediniz.
                                            Şifrenizi hatırlamıyorsanız şifremi unuttum ekranından sıfırlayabilirsiniz."
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
