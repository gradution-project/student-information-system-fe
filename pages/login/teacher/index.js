import {LockClosedIcon} from '@heroicons/react/solid'
import SISTitle from "../../../public/components/page-titles";
import {Fragment, useState} from "react";
import {useRouter} from "next/router";
import {Dialog, Transition} from "@headlessui/react";
import Cookies from 'universal-cookie';

export default function TeacherLogin() {

    const [teacherNumber, setTeacherNumber] = useState();
    const [password, setPassword] = useState();

    const router = useRouter();

    const changeTeacherNumber = event => {
        const teacherNumber = event.target.value;
        setTeacherNumber(teacherNumber);
    }

    const changePassword = event => {
        const password = event.target.value;
        setPassword(password);
    }

    let [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    let [isOpenProcessing, setIsOpenProcessing] = useState(false);

    function closeProcessingModal() {
        setIsOpenProcessing(false);
    }

    function openProcessingModal() {
        setIsOpenProcessing(true);
    }

    const teacherLogin = async (event) => {
        openProcessingModal();

        event.preventDefault();

        const loginRes = await fetch("http://localhost:8585/login/teacher", {
            body: JSON.stringify({teacherId: teacherNumber, password: password}),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });
        const loginData = await loginRes.json();
        if (loginData.response.loginSuccess) {
            const cookies = new Cookies();
            cookies.set('teacherNumber', teacherNumber, {path: '/'});
            const getRes = await fetch("http://localhost:8585/teacher/" + cookies.get('teacherNumber'), {
                headers: {'Content-Type': 'application/json'},
                method: 'GET'
            });
            const getData = await getRes.json();
            if (getData.success) {
                cookies.set('teacherName', getData.response.personalInfoResponse.name, {path: '/'});
                cookies.set('teacherSurname', getData.response.personalInfoResponse.surname, {path: '/'});
                cookies.set('teacherFullName', cookies.get('teacherName') + ' ' + cookies.get('teacherSurname'), {path: '/'});
                cookies.set('teacherRole', getData.response.academicInfoResponse.role, {path: '/'});
                cookies.set('teacherDegree', getData.response.academicInfoResponse.degree, {path: '/'});
                cookies.set('teacherDepartment', getData.response.academicInfoResponse.departmentResponse.name, {path: '/'});
                cookies.set('teacherAcademicEmail', getData.response.academicInfoResponse.email, {path: '/'});
                cookies.set('teacherFieldOfStudy', getData.response.academicInfoResponse.fieldOfStudy, {path: '/'});
                cookies.set('teacherAcademicPhoneNumber', getData.response.academicInfoResponse.phoneNumber, {path: '/'});
                cookies.set('teacherRegistrationDate', getData.response.academicInfoResponse.registrationDate, {path: '/'});
                cookies.set('teacherFaculty', getData.response.academicInfoResponse.departmentResponse.facultyResponse.name, {path: '/'});
                cookies.set('teacherTcNo', getData.response.personalInfoResponse.tcNo, {path: '/'});
                cookies.set('teacherPersonalEmail', getData.response.personalInfoResponse.email, {path: '/'});
                cookies.set('teacherPersonalPhoneNumber', getData.response.personalInfoResponse.phoneNumber, {path: '/'});
                cookies.set('teacherBirthday', getData.response.personalInfoResponse.birthday, {path: '/'});
                cookies.set('teacherAddress', getData.response.personalInfoResponse.address, {path: '/'});
                closeProcessingModal();
                await router.push("/teacher");
            }
        }
        closeProcessingModal();
        openModal();
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
                            <form className="px-4 max-w-2xl mx-auto space-y-6" onSubmit={teacherLogin}>

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <h2 className="mt-8 font-phenomenaExtraBold text-center text-5xl text-sis-darkblue mb-6">
                                            ÖĞRETMEN GİRİŞİ
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
                                            <a href="/login/teacher/forgot-password"
                                               className="font-phenomenaBold text-lg text-sis-darkblue hover:text-sis-yellow">
                                                Şifrenizi mi unuttunuz?
                                            </a>
                                        </div>

                                        <Transition appear show={isOpen} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closeModal}
                                            >
                                                <div className="min-h-screen px-4 text-center">
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Dialog.Overlay className="fixed inset-0"/>
                                                    </Transition.Child>

                                                    <span
                                                        className="inline-block h-screen align-middle"
                                                        aria-hidden="true"
                                                    >
              &#8203;
            </span>
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0 scale-95"
                                                        enterTo="opacity-100 scale-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100 scale-100"
                                                        leaveTo="opacity-0 scale-95"
                                                    >
                                                        <div
                                                            className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                                            <Dialog.Title
                                                                as="h3"
                                                                className="text-3xl mb-4 leading-9 text-sis-white text-center font-phenomenaBold"
                                                            >
                                                                <div className="border bg-sis-fail rounded-xl p-6">
                                                                    Öğretmen Numaranız veya Şifreniz Yanlış!
                                                                </div>
                                                            </Dialog.Title>
                                                            <div className="mt-2">
                                                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                    Öğretmen Numaranızı veya Şifrenizi kontrol ediniz.
                                                                    Şifrenizi hatırlamıyorsanız şifremi unuttum
                                                                    ekranından sıfırlayabilirsiniz.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>

                                        <Transition appear show={isOpenProcessing} as={Fragment}>
                                            <Dialog
                                                as="div"
                                                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                onClose={closeProcessingModal}
                                            >
                                                <div className="min-h-screen px-4 text-center">
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0"
                                                        enterTo="opacity-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Dialog.Overlay className="fixed inset-0"/>
                                                    </Transition.Child>

                                                    <span
                                                        className="inline-block h-screen align-middle"
                                                        aria-hidden="true"
                                                    >
              &#8203;
            </span>
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0 scale-95"
                                                        enterTo="opacity-100 scale-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100 scale-100"
                                                        leaveTo="opacity-0 scale-95"
                                                    >
                                                        <div
                                                            className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                                            <Dialog.Title
                                                                as="h3"
                                                                className="text-3xl font-medium leading-9 text-sis-yellow text-center font-phenomenaBold"
                                                            >
                                                                Giriş Yapılıyor...
                                                            </Dialog.Title>
                                                        </div>
                                                    </Transition.Child>
                                                </div>
                                            </Dialog>
                                        </Transition>
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
