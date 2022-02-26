import SISTitle from "../../../../public/components/page-titles";
import StudentNavbar from "../../../../public/components/navbar/student/student-navbar";
import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {useRouter} from "next/router";
import {studentClassLevels, studentDegrees} from "../../../../public/constants/student";
import UnauthorizedAccessPage from "../../../401";

export async function getServerSideProps(context) {
    const studentId = context.req.cookies['studentNumber']
    if (studentId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const SIS_API_URL = process.env.SIS_API_URL;
    const studentResponse = await fetch(`${SIS_API_URL}/student/` + studentId, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const studentData = await studentResponse.json();
    if (studentData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                student: studentData.response,
                SIS_API_URL: SIS_API_URL
            }
        }
    }
}

export default function StudentMyInformation({isPagePermissionSuccess, student, SIS_API_URL}) {

    if (isPagePermissionSuccess) {
        const {academicInfoResponse} = student;
        const {personalInfoResponse} = student;

        const {
            departmentResponse,
            studentId,
            classLevel,
            degree,
            registrationDate,
        } = academicInfoResponse;
        const {name, surname, phoneNumber, tcNo, birthday, address} = personalInfoResponse;
        const {facultyResponse} = departmentResponse;

        const router = new useRouter();

        const [studentEmail, setStudentEmail] = useState(personalInfoResponse.email);
        const changeStudentEmail = event => {
            const studentEmail = event.target.value;
            setStudentEmail(studentEmail);
        }

        const [studentAddress, setStudentAddress] = useState(address);
        const changeStudentAddress = event => {
            const studentAddress = event.target.value;
            setStudentAddress(studentAddress);
        }

        const [studentPhoneNumber, setStudentPhoneNumber] = useState(phoneNumber);
        const changeStudentPhoneNumber = event => {
            const studentPhoneNumber = event.target.value;
            setStudentPhoneNumber(studentPhoneNumber);
        }

        let [isOpenSuccessPersonal, setIsOpenSuccessPersonal] = useState(false);

        function closeSuccessModalPersonal() {
            setIsOpenSuccessPersonal(false);
            router.reload();
        }

        function openSuccessModalPersonal() {
            setIsOpenSuccessPersonal(true);
        }

        let [isOpenFailPersonal, setIsOpenFailPersonal] = useState(false);

        function closeFailModalPersonal() {
            setIsOpenFailPersonal(false);
        }

        function openFailModalPersonal() {
            setIsOpenFailPersonal(true);
        }

        let [isOpenProcessingPersonal, setIsOpenProcessingPersonal] = useState(false);

        function closeProcessingModalPersonal() {
            setIsOpenProcessingPersonal(false);
        }

        function openProcessingModalPersonal() {
            setIsOpenProcessingPersonal(true);
        }


        const studentUpdatePersonal = async (event) => {
            openProcessingModalPersonal();

            event.preventDefault()
            const updatePersonalRes = await fetch(`${SIS_API_URL}/student/update/personal-info/${studentId}`, {
                headers: {'Content-Type': 'application/json'},
                method: 'PUT',
                body: JSON.stringify({
                    operationInfoRequest: {
                        userId: studentId
                    },
                    personalInfoRequest: {
                        address: studentAddress,
                        birthday: birthday,
                        email: studentEmail,
                        name: name,
                        phoneNumber: studentPhoneNumber,
                        surname: surname,
                        tcNo: tcNo
                    }
                }),
            });
            const updatePersonalData = await updatePersonalRes.json();
            if (updatePersonalData.success) {
                closeProcessingModalPersonal();
                openSuccessModalPersonal()
            } else {
                closeProcessingModalPersonal();
                openFailModalPersonal();
            }
        }

        return (
            <>
                <SISTitle/>
                <StudentNavbar/>
                <div>
                    <div className="select-none mt-5 md:mt-0 md:col-span-2">
                        <div className="md:col-span-1">
                            <form className="mt-5 px-4 max-w-3xl mx-auto space-y-6">
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                            <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                                AKADEMİK BİLGİLERİM
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="student-number"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    ÖĞRENCİ NUMARASI
                                                </label>
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    value={studentId}
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="registration-date"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    KAYIT TARİHİ
                                                </label>
                                                <input
                                                    type="text"
                                                    name="registration-date"
                                                    id="registration-date"
                                                    value={registrationDate}
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="faculty"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    FAKÜLTESİ
                                                </label>
                                                <select
                                                    id="faculty"
                                                    name="faculty"
                                                    autoComplete="faculty-name"
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                >
                                                    <option>{facultyResponse.name}</option>
                                                </select>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="department"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    BÖLÜMÜ
                                                </label>
                                                <select
                                                    id="department-id"
                                                    name="department-id"
                                                    autoComplete="department-id"
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                >
                                                    <option>{departmentResponse.name}</option>
                                                </select>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="degree"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    DERECESİ
                                                </label>
                                                <select
                                                    id="degree"
                                                    name="degree"
                                                    autoComplete="degree"
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                >
                                                    {studentDegrees.map(sDegree => (
                                                        degree === sDegree.enum
                                                            ?
                                                            <option value={sDegree.enum}>{sDegree.tr}</option>
                                                            :
                                                            null
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="student-class"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    SINIF
                                                </label>
                                                <select
                                                    id="class"
                                                    name="class"
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                >
                                                    {studentClassLevels.map(sClassLevel => (
                                                        classLevel === sClassLevel.enum
                                                            ?
                                                            <option
                                                                value={sClassLevel.enum}>{sClassLevel.tr}</option>
                                                            :
                                                            null
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="email-address"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    E-MAİL ADRESİ
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email-address"
                                                    id="email-address"
                                                    value={academicInfoResponse.email}
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200"/>
                    </div>
                </div>

                <div className="select-none mb-10 mt-10 sm:mt-0">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <form className="px-4 max-w-3xl mx-auto space-y-6">
                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                            <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                                KİŞİSEL BİLGİLERİM
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    ADI
                                                </label>
                                                <input
                                                    type="text"
                                                    name="first-name"
                                                    id="first-name"
                                                    defaultValue={name}
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last-name"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    SOYADI
                                                </label>
                                                <input
                                                    type="text"
                                                    name="last-name"
                                                    id="last-name"
                                                    defaultValue={surname}
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="tc-no"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    T.C. KİMLİK NUMARASI
                                                </label>
                                                <input
                                                    type="text"
                                                    name="tc-no"
                                                    id="tc-no"
                                                    defaultValue={tcNo}
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="birthday"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    DOĞUM TARİHİ
                                                </label>
                                                <input
                                                    type="text"
                                                    name="birthday"
                                                    id="birthday"
                                                    required
                                                    minLength="10"
                                                    maxLength="10"
                                                    defaultValue={birthday}
                                                    disabled
                                                    className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="email-address"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    E-MAİL ADRESİ
                                                </label>
                                                <input
                                                    onChange={changeStudentEmail}
                                                    type="text"
                                                    name="email-address"
                                                    id="email-address"
                                                    autoComplete="email"
                                                    defaultValue={personalInfoResponse.email}
                                                    className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="phone-number"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    TELEFON NUMARASI
                                                </label>
                                                <input
                                                    onChange={(e) => {
                                                        let pNumberLength = e.target.value.length;
                                                        if (pNumberLength <= 1) {
                                                            e.target.value = "+90 (" + e.target.value;
                                                        }
                                                        if (pNumberLength > 7 && pNumberLength < 10) {
                                                            e.target.value = e.target.value + ") ";
                                                        }
                                                        if (pNumberLength > 12 && pNumberLength < 15) {
                                                            e.target.value = e.target.value + " ";
                                                        }
                                                        if (pNumberLength > 15 && pNumberLength < 18) {
                                                            e.target.value = e.target.value + " ";
                                                        }
                                                        changeStudentPhoneNumber(e)
                                                    }}
                                                    type="text"
                                                    name="phone-number"
                                                    id="phone-number"
                                                    required
                                                    minLength="19"
                                                    maxLength="19"
                                                    defaultValue={phoneNumber}
                                                    className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label htmlFor="home-address"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    EV ADRESİ
                                                </label>
                                                <input
                                                    onChange={changeStudentAddress}
                                                    type="text"
                                                    name="home-address"
                                                    id="home-address"
                                                    autoComplete="home-address"
                                                    defaultValue={address}
                                                    className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>
                                        </div>

                                        {/*              <div className="py-5 mt-2">
                                        <label className="text-xl text-sis-darkblue font-phenomenaBold">
                                            PROFİL FOTOĞRAFI
                                        </label>
                                        <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path
                              d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                      </span>
                                            <button
                                                type="button"
                                                className="font-phenomenaBold ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-md text-sis-darkblue font-phenomenaRegular leading-4 text-gray-700 hover:bg-sis-yellow hover:text-sis-white"
                                            >
                                                Fotoğrafı Güncelle
                                            </button>
                                        </div>
                                    </div>


                                    <div>
                                        <label className="text-xl text-sis-darkblue font-phenomenaBold">
                                            Fotoğrafı Yükle
                                        </label>
                                        <div
                                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-phenomenaBold text-lg text-sis-yellow hover:text-sis-yellow"
                                                    >
                                                        <span>Dosyayı yükleyin</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                               className="sr-only"/>
                                                    </label>
                                                    <p className="pl-1 text-lg font-phenomenaRegular">veya sürükleyip
                                                        bırakın.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>*/}
                                        {(
                                            personalInfoResponse.modifiedDate !== null
                                                ?
                                                <div className="mt-6 sm:col-span-6">
                                                    <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                        Son Düzenlenme Tarihi
                                                        : {personalInfoResponse.modifiedDate}
                                                    </a>
                                                </div>
                                                :
                                                null
                                        )}
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            onClick={studentUpdatePersonal}
                                            type="submit"
                                            className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                        >
                                            GÜNCELLE
                                        </button>
                                    </div>

                                    <Transition appear show={isOpenSuccessPersonal} as={Fragment}>
                                        <Dialog
                                            as="div"
                                            className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                            onClose={closeSuccessModalPersonal}
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
                                                            className="text-3xl mb-4 font-medium leading-9 text-sis-white text-center font-phenomenaBold"
                                                        >
                                                            <div
                                                                className="border bg-sis-success rounded-xl p-6">
                                                                Kişisel Bilgi Güncelleme İşlemi Başarılı!
                                                            </div>
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                Kişisel Bilgi Güncelleme İşlemi başarıyla
                                                                gerçekleşti.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Transition.Child>
                                            </div>
                                        </Dialog>
                                    </Transition>
                                    <Transition appear show={isOpenFailPersonal} as={Fragment}>
                                        <Dialog
                                            as="div"
                                            className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                            onClose={closeFailModalPersonal}
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
                                                            className="text-3xl mb-4 font-medium leading-9 text-sis-white text-center font-phenomenaBold"
                                                        >
                                                            <div className="border bg-sis-fail rounded-xl p-6">
                                                                Kişisel Bilgi Güncelleme İşlemi Başarısız!
                                                            </div>
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                Lütfen girdiğiniz verileri kontrol ediniz.
                                                                Verilerinizi doğru girdiyseniz sistemsel bir
                                                                hatadan dolayı isteğiniz sonuçlandıralamamış
                                                                olabilir.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Transition.Child>
                                            </div>
                                        </Dialog>
                                    </Transition>

                                    <Transition appear show={isOpenProcessingPersonal} as={Fragment}>
                                        <Dialog
                                            as="div"
                                            className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                            onClose={closeProcessingModalPersonal}
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
                                                            Kişisel Bilgi Güncelleme İsteğiniz İşleniyor...
                                                        </Dialog.Title>
                                                    </div>
                                                </Transition.Child>
                                            </div>
                                        </Dialog>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <UnauthorizedAccessPage user="student"/>
        )
    }
}