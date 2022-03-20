import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import SisOfficerStorage from "../../../../../public/storage/officer/SisOfficerStorage";
import UnauthorizedAccessPage from "../../../../401";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";
import SisOperationButton from "../../../../../public/components/buttons/SisOperationButton";
import TeacherController from "../../../../../public/api/teacher/TeacherController";
import TeacherDegree from "../../../../../public/constants/teacher/TeacherDegree";
import TeacherRole from "../../../../../public/constants/teacher/TeacherRole";
import DepartmentController from "../../../../../public/api/department/DepartmentController";
import DepartmentStatus from "../../../../../public/constants/department/DepartmentStatus";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const departmentsData = await DepartmentController.getAllDepartmentsByStatus(DepartmentStatus.ACTIVE);
    if (departmentsData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                departments: departmentsData.response
            }
        }
    }
}


export default function SaveTeacher({isPagePermissionSuccess, operationUserId, departments}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    let [isOpenProcessingSaveNotification, setIsOpenProcessingSaveNotification] = useState(false);

    function closeProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(false);
    }

    function openProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(true);
    }

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

    const [departmentId, setDepartmentId] = useState();
    const changeDepartmentId = event => {
        const departmentId = event.target.value;
        setDepartmentId(departmentId);
    }

    const [fieldOfStudy, setFieldOfStudy] = useState();
    const changeFieldOfStudy = event => {
        const fieldOfStudy = event.target.value;
        setFieldOfStudy(fieldOfStudy);
    }

    const [degree, setDegree] = useState();
    const changeDegree = event => {
        const degree = event.target.value;
        setDegree(degree);
    }

    const [role, setRole] = useState();
    const changeRole = event => {
        const role = event.target.value;
        setRole(role);
    }

    const [academicPhoneNumber, setAcademicPhoneNumber] = useState();
    const changeAcademicPhoneNumber = event => {
        const academicPhoneNumber = event.target.value;
        setAcademicPhoneNumber(academicPhoneNumber);
    }

    const [name, setName] = useState();
    const changeName = event => {
        const name = event.target.value;
        setName(name);
    }

    const [surname, setSurname] = useState();
    const changeSurname = event => {
        const surname = event.target.value;
        setSurname(surname);
    }

    const [tcNo, setTcNo] = useState();
    const changeTcNo = event => {
        const tcNo = event.target.value;
        setTcNo(tcNo);
    }

    const [birthday, setBirthday] = useState();
    const changeBirthday = event => {
        const birthday = event.target.value;
        setBirthday(birthday);
    }

    const [email, setEmail] = useState();
    const changeEmail = event => {
        const email = event.target.value;
        setEmail(email);
    }

    const [address, setAddress] = useState();
    const changeAddress = event => {
        const address = event.target.value;
        setAddress(address);
    }

    const [personalPhoneNumber, setPersonalPhoneNumber] = useState();
    const changePersonalPhoneNumber = event => {
        const personalPhoneNumber = event.target.value;
        setPersonalPhoneNumber(personalPhoneNumber);
    }

    const teacherSave = async (event) => {
        openProcessingSaveNotification();

        event.preventDefault();

        let phoneNumber;

        phoneNumber = academicPhoneNumber;
        const academicInfo = {departmentId, fieldOfStudy, degree, role, phoneNumber}

        phoneNumber = personalPhoneNumber;
        const personalInfo = {name, surname, tcNo, birthday, email, address, phoneNumber}
        const teacherData = await TeacherController.saveTeacher(operationUserId, academicInfo, personalInfo);
        if (teacherData.success) {
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
                                                onChange={changeName}
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
                                                onChange={changeSurname}
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
                                                onChange={changeTcNo}
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
                                                    changeBirthday(e)
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
                                                onChange={changeEmail}
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
                                                    changePersonalPhoneNumber(e)
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
                                                onChange={changeAddress}
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
                                                onChange={changeDegree}
                                                id="degree"
                                                name="degree"
                                                autoComplete="degree"
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Ünvan Seçiniz...</option>
                                                {TeacherDegree.getAll.map(tDegree => (
                                                    <option key={tDegree.enum}
                                                            value={tDegree.enum}>{tDegree.tr}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="role"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ROLÜ
                                            </label>
                                            <select
                                                onChange={changeRole}
                                                id="role"
                                                name="role"
                                                className="form-select font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Rol Seçiniz...</option>
                                                {TeacherRole.getAll.map(tRole => (
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
                                                onChange={changeDepartmentId}
                                                id="department-id"
                                                name="department-id"
                                                autoComplete="department-id"
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Bölüm Seçiniz...</option>
                                                {departments.map((department) => (
                                                    <option key={department.departmentId}
                                                            value={department.departmentId}>{department.name}</option>
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
                                                    changeAcademicPhoneNumber(e)
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
                                                onChange={changeFieldOfStudy}
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
                                    {SisOperationButton.getSaveButton("KAYDET")}
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