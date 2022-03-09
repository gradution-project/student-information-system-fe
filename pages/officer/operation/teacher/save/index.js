import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import {teacherDegrees, teacherRoles} from "../../../../../public/constants/teacher";
import {getOfficerNumberWithContext} from "../../../../../public/storage/officer";
import UnauthorizedAccessPage from "../../../../401";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";

export async function getServerSideProps(context) {
    const officerId = getOfficerNumberWithContext(context)
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const SIS_API_URL = process.env.SIS_API_URL;
    const SIS_FE_URL = process.env.SIS_FE_URL;
    const departmentResponses = await fetch(`${SIS_API_URL}/department?status=ACTIVE`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const departmentDatas = await departmentResponses.json();
    if (departmentDatas.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                SIS_API_URL: SIS_API_URL,
                SIS_FE_URL: SIS_FE_URL,
                departments: departmentDatas.response
            }
        }
    }
}


export default function SaveTeacher({isPagePermissionSuccess, operationUserId, SIS_API_URL, SIS_FE_URL, departments}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    let [isOpenSuccessSaveNotification, setIsOpenSuccessSaveNotification] = useState(false);

    function closeSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(false);
        router.push("/officer/operation/teacher").then(() => router.reload());
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


    const [teacherName, setTeacherName] = useState();
    const changeTeacherName = event => {
        const teacherName = event.target.value;
        setTeacherName(teacherName);
    }

    const [teacherSurname, setTeacherSurname] = useState();
    const changeTeacherSurname = event => {
        const teacherSurname = event.target.value;
        setTeacherSurname(teacherSurname);
    }

    const [teacherTcNo, setTeacherTcNo] = useState();
    const changeTeacherTcNo = event => {
        const teacherTcNo = event.target.value;
        setTeacherTcNo(teacherTcNo);
    }

    const [teacherBirthday, setTeacherBirthday] = useState();
    const changeTeacherBirthday = event => {
        const teacherBirthday = event.target.value;
        setTeacherBirthday(teacherBirthday);
    }

    const [teacherEmail, setTeacherEmail] = useState();
    const changeTeacherEmail = event => {
        const teacherEmail = event.target.value;
        setTeacherEmail(teacherEmail);
    }

    const [teacherPersonalPhoneNumber, setTeacherPersonalPhoneNumber] = useState();
    const changeTeacherPersonalPhoneNumber = event => {
        const teacherPersonalPhoneNumber = event.target.value;
        setTeacherPersonalPhoneNumber(teacherPersonalPhoneNumber);
    }

    const [teacherAddress, setTeacherAddress] = useState();
    const changeTeacherAddress = event => {
        const teacherAddress = event.target.value;
        setTeacherAddress(teacherAddress);
    }

    const [teacherDegree, setTeacherDegree] = useState();
    const changeTeacherDegree = event => {
        const teacherDegree = event.target.value;
        setTeacherDegree(teacherDegree);
    }

    const [teacherRole, setTeacherRole] = useState();
    const changeTeacherRole = event => {
        const teacherRole = event.target.value;
        setTeacherRole(teacherRole);
    }

    const [teacherDepartmentId, setTeacherDepartmentId] = useState();
    const changeTeacherDepartmentId = event => {
        const teacherDepartmentId = event.target.value;
        setTeacherDepartmentId(teacherDepartmentId);
    }

    const [teacherAcademicPhoneNumber, setTeacherAcademicPhoneNumber] = useState();
    const changeTeacherAcademicPhoneNumber = event => {
        const teacherAcademicPhoneNumber = event.target.value;
        setTeacherAcademicPhoneNumber(teacherAcademicPhoneNumber);
    }

    const [teacherFieldOfStudy, setTeacherFieldOfStudy] = useState();
    const changeTeacherFieldOfStudy = event => {
        const teacherFieldOfStudy = event.target.value;
        setTeacherFieldOfStudy(teacherFieldOfStudy);
    }

    const teacherSave = async (event) => {
        openProcessingSaveNotification();

        event.preventDefault();

        const saveRes = await fetch(`${SIS_API_URL}/teacher/save`, {
            body: JSON.stringify({
                academicInfoRequest: {
                    degree: teacherDegree,
                    departmentId: teacherDepartmentId,
                    fieldOfStudy: teacherFieldOfStudy,
                    phoneNumber: teacherAcademicPhoneNumber,
                    role: teacherRole
                },
                operationInfoRequest: {
                    userId: operationUserId,
                    feUrl: SIS_FE_URL
                },
                personalInfoRequest: {
                    address: teacherAddress,
                    birthday: teacherBirthday,
                    email: teacherEmail,
                    name: teacherName,
                    phoneNumber: teacherPersonalPhoneNumber,
                    surname: teacherSurname,
                    tcNo: teacherTcNo
                }
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });
        const saveData = await saveRes.json();
        if (saveData.success) {
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
            <div className="select-none mt-10 sm:mt-0">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="px-4 py-5 max-w-2xl mx-auto space-y-6" onSubmit={teacherSave}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="bg-white sm:p-6">
                                    <div className="px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="mb-8 py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-4xl">
                                            ÖĞRETMEN EKLEME
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ADI
                                            </label>
                                            <input
                                                onChange={changeTeacherName}
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SOYADI
                                            </label>
                                            <input
                                                onChange={changeTeacherSurname}
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="tc-no"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                T.C. KİMLİK NUMARASI
                                            </label>
                                            <input
                                                onChange={changeTeacherTcNo}
                                                type="text"
                                                name="tc-no"
                                                id="tc-no"
                                                minLength="11"
                                                maxLength="11"
                                                pattern="[0-9]+"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="birthday"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DOĞUM TARİHİ
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    let birthdayLength = e.target.value.length;
                                                    if (birthdayLength > 1 && birthdayLength < 3) {
                                                        if (e.target.value <= 31) {
                                                            e.target.value = e.target.value + ".";
                                                        } else {
                                                            e.target.value = "";
                                                        }
                                                    }
                                                    if (birthdayLength > 4 && birthdayLength < 7) {
                                                        e.target.value = e.target.value + ".";
                                                    }
                                                    changeTeacherBirthday(e)
                                                }}
                                                type="text"
                                                name="birthday"
                                                id="birthday"
                                                required
                                                minLength="10"
                                                maxLength="10"
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MAİL ADRESİ
                                            </label>
                                            <input
                                                onChange={changeTeacherEmail}
                                                type="email"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                required
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
                                                    changeTeacherPersonalPhoneNumber(e)
                                                }}
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                required
                                                minLength="19"
                                                maxLength="19"
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
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="degree"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÜNVANI
                                            </label>
                                            <select
                                                onChange={changeTeacherDegree}
                                                id="degree"
                                                name="degree"
                                                autoComplete="degree"
                                                value={teacherDegree}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Ünvan Seçiniz...</option>
                                                {teacherDegrees.map(tDegree => (
                                                        <option key={tDegree.enum} value={tDegree.enum}>{tDegree.tr}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="role"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ROLÜ
                                            </label>
                                            <select
                                                onChange={changeTeacherRole}
                                                id="role"
                                                name="role"
                                                value={teacherRole}
                                                className="form-select font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Rol Seçiniz...</option>
                                                {teacherRoles.map(tRole => (
                                                        <option key={tRole.enum} value={tRole.enum}>{tRole.tr}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="department"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                BÖLÜMÜ
                                            </label>
                                            <select
                                                onChange={changeTeacherDepartmentId}
                                                id="department-id"
                                                name="department-id"
                                                autoComplete="department-id"
                                                value={teacherDepartmentId}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Bölüm Seçiniz...</option>
                                                {departments.map((department) => (
                                                        <option key={department.departmentId} value={department.departmentId}>{department.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="phone"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DAHİLİ TELEFON
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
                                                    changeTeacherAcademicPhoneNumber(e)
                                                }}
                                                type="text"
                                                name="phone"
                                                id="phone"
                                                required
                                                minLength="19"
                                                maxLength="19"
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="field-of-study"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÇALIŞMA ALANI
                                            </label>
                                            <input
                                                onChange={changeTeacherFieldOfStudy}
                                                type="text"
                                                name="field-of-study"
                                                id="field-of-study"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        KAYDET
                                    </button>
                                </div>

                                <ProcessNotification
                                    isOpen={isOpenProcessingSaveNotification}
                                    closeNotification={closeProcessingSaveNotification}
                                    title="Öğretmen Kayıt İsteğiniz İşleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessSaveNotification}
                                    closeNotification={closeSuccessSaveNotification}
                                    title="Öğretmen Kaydı Tamamlandı!"
                                    description="Öğretmen Kayıt İşlemi başarıyla gerçekleşti.
                                    Mesaj penceresini kapattıktan sonra Öğretmen Listeleme ekranına yönlendirileceksiniz."
                                />

                                <FailNotification
                                    isOpen={isOpenFailSaveNotification}
                                    closeNotification={closeFailSaveNotification}
                                    title="Öğretmen Kaydı Tamamlanamadı!"
                                    description="Lütfen girdiğiniz verileri kontrol ediniz.
                                    Verilerinizi doğru girdiyseniz
                                    sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}