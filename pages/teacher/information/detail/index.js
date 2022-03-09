import SISTitle from "../../../../public/components/page-titles";
import TeacherNavbar from "../../../../public/components/navbar/teacher/teacher-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import {teacherDegrees, teacherRoles} from "../../../../public/constants/teacher";
import UnauthorizedAccessPage from "../../../401";
import SisTeacherStorage from "../../../../public/storage/teacher/SisTeacherStorage";
import ProcessNotification from "../../../../public/notifications/process";
import SuccessNotification from "../../../../public/notifications/success";
import FailNotification from "../../../../public/notifications/fail";

export async function getServerSideProps(context) {
    const teacherId = SisTeacherStorage.getNumberWithContext(context);
    if (teacherId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const SIS_API_URL = process.env.SIS_API_URL;
    const teacherResponse = await fetch(`${SIS_API_URL}/teacher/` + teacherId, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const teacherData = await teacherResponse.json();
    if (teacherData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                SIS_API_URL: SIS_API_URL,
                teacher: teacherData.response
            }
        }
    }
}

export default function TeacherMyInformation({isPagePermissionSuccess, SIS_API_URL, teacher}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="teacher"/>
        )
    }

    const {academicInfoResponse} = teacher;
    const {personalInfoResponse} = teacher;

    const {
        departmentResponse,
        teacherId,
        degree,
        role,
        registrationDate,
        fieldOfStudy
    } = academicInfoResponse;
    const {name, surname, phoneNumber, tcNo, birthday, address} = personalInfoResponse;
    const {facultyResponse} = departmentResponse;

    const router = new useRouter();

    let [isOpenProcessingPersonalInfoUpdateNotification, setIsOpenProcessingPersonalInfoUpdateNotification] = useState(false);

    function closeProcessingPersonalInfoUpdateNotification() {
        setIsOpenProcessingPersonalInfoUpdateNotification(false);
    }

    function openProcessingPersonalInfoUpdateNotification() {
        setIsOpenProcessingPersonalInfoUpdateNotification(true);
    }

    let [isOpenSuccessPersonalInfoUpdateNotification, setIsOpenSuccessPersonalInfoUpdateNotification] = useState(false);

    function closeSuccessPersonalInfoUpdateNotification() {
        setIsOpenSuccessPersonalInfoUpdateNotification(false);
        router.reload();
    }

    function openSuccessPersonalInfoUpdateNotification() {
        setIsOpenSuccessPersonalInfoUpdateNotification(true);
    }

    let [isOpenFailPersonalInfoUpdateNotification, setIsOpenFailPersonalInfoUpdateNotification] = useState(false);

    function closeFailPersonalInfoUpdateNotification() {
        setIsOpenFailPersonalInfoUpdateNotification(false);
    }

    function openFailPersonalInfoUpdateNotification() {
        setIsOpenFailPersonalInfoUpdateNotification(true);
    }


    const [teacherEmail, setTeacherEmail] = useState(personalInfoResponse.email);
    const changeTeacherEmail = event => {
        const teacherEmail = event.target.value;
        setTeacherEmail(teacherEmail);
    }

    const [teacherAddress, setTeacherAddress] = useState(address);
    const changeTeacherAddress = event => {
        const teacherAddress = event.target.value;
        setTeacherAddress(teacherAddress);
    }

    const [teacherPhoneNumber, setTeacherPhoneNumber] = useState(personalInfoResponse.phoneNumber);
    const changeTeacherPhoneNumber = event => {
        const teacherPhoneNumber = event.target.value;
        setTeacherPhoneNumber(teacherPhoneNumber);
    }

    const teacherUpdatePersonal = async (event) => {
        openProcessingPersonalInfoUpdateNotification();

        event.preventDefault()

        const updatePersonalRes = await fetch(`${SIS_API_URL}/teacher/update/personal-info/${teacherId}`, {
            headers: {'Content-Type': 'application/json'},
            method: 'PUT',
            body: JSON.stringify({
                operationInfoRequest: {
                    userId: teacherId
                },
                personalInfoRequest: {
                    address: teacherAddress,
                    birthday: birthday,
                    email: teacherEmail,
                    name: name,
                    phoneNumber: teacherPhoneNumber,
                    surname: surname,
                    tcNo: tcNo
                }
            }),
        });
        const updatePersonalData = await updatePersonalRes.json();
        if (updatePersonalData.success) {
            closeProcessingPersonalInfoUpdateNotification();
            openSuccessPersonalInfoUpdateNotification();
        } else {
            closeProcessingPersonalInfoUpdateNotification();
            openFailPersonalInfoUpdateNotification();
        }
    }

    return (
        <>
            <SISTitle/>
            <TeacherNavbar/>
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
                                            <label htmlFor="teacher-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÖĞRETMEN NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="teacher-number"
                                                id="teacher-number"
                                                value={teacherId}
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
                                                FAKÜLTE ADI
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
                                                BÖLÜM ADI
                                            </label>
                                            <select
                                                id="department"
                                                name="department"
                                                autoComplete="department-name"
                                                disabled
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>{departmentResponse.name}</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="degree"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÜNVANI
                                            </label>
                                            <select
                                                id="degree"
                                                name="degree"
                                                autoComplete="degree"
                                                disabled
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                {teacherDegrees.map(tDegree => (
                                                    degree === tDegree.enum
                                                        ?
                                                        <option value={tDegree.enum}>{tDegree.tr}</option>
                                                        :
                                                        null
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="degree"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ROLÜ
                                            </label>
                                            <select
                                                id="degree"
                                                name="degree"
                                                autoComplete="degree"
                                                disabled
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                {teacherRoles.map(tRole => (
                                                    role === tRole.enum
                                                        ?
                                                        <option value={tRole.enum}>{tRole.tr}</option>
                                                        :
                                                        null
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="field-of-study"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÇALIŞMA ALANI
                                            </label>
                                            <input
                                                type="text"
                                                name="field-of-study"
                                                id="field-of-study"
                                                value={fieldOfStudy}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DAHİLİ TELEFON
                                            </label>
                                            <input
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                disabled
                                                value={academicInfoResponse.phoneNumber}
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
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
                                                disabled
                                                value={academicInfoResponse.email}
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

            <div className="select-none mt-10 sm:mt-0">
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
                                                onChange={changeTeacherEmail}
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
                                                    changeTeacherPhoneNumber(e)
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
                                                onChange={changeTeacherAddress}
                                                type="text"
                                                name="home-address"
                                                id="home-address"
                                                autoComplete="home-address"
                                                defaultValue={address}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    {/*
                                  <div className="py-5 mt-2">
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
                                    </div>

*/}

                                    {(
                                        personalInfoResponse.modifiedDate !== null
                                            ?
                                            <div className="mt-6 sm:col-span-6">
                                                <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                    Son Düzenlenme Tarihi : {personalInfoResponse.modifiedDate}
                                                </a>
                                            </div>
                                            :
                                            null
                                    )}
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        onClick={teacherUpdatePersonal}
                                        type="submit"
                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                    >
                                        GÜNCELLE
                                    </button>
                                </div>


                                <ProcessNotification
                                    isOpen={isOpenProcessingPersonalInfoUpdateNotification}
                                    closeNotification={closeProcessingPersonalInfoUpdateNotification}
                                    title="Kişisel Bilgi Güncelleme İsteğiniz İşleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessPersonalInfoUpdateNotification}
                                    closeNotification={closeSuccessPersonalInfoUpdateNotification}
                                    title="Kişisel Bilgi Güncelleme İşlemi Başarılı!"
                                    description="Kişisel Bilgi Güncelleme İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailPersonalInfoUpdateNotification}
                                    closeNotification={closeFailPersonalInfoUpdateNotification}
                                    title="Kişisel Bilgi Güncelleme İşlemi Başarısız!"
                                    description="Lütfen girdiğiniz verileri kontrol ediniz.
                                    Verilerinizi doğru girdiyseniz
                                    sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}