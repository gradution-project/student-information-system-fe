import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import UnauthorizedAccessPage from "../../../../../../401";
import ProcessNotification from "../../../../../../../public/notifications/process";
import SuccessNotification from "../../../../../../../public/notifications/success";
import FailNotification from "../../../../../../../public/notifications/fail";
import SisOfficerStorage from "../../../../../../../public/storage/officer/SisOfficerStorage";
import OfficerController from "../../../../../../../public/api/officer/OfficerController";
import FacultyController from "../../../../../../../public/api/faculty/FacultyController";
import FacultyStatus from "../../../../../../../public/constants/faculty/FacultyStatus";
import OfficerStatus from "../../../../../../../public/constants/officer/OfficerStatus";
import SisOperationButton from "../../../../../../../public/components/buttons/SisOperationButton";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const facultiesData = await FacultyController.getAllFacultiesByStatus(FacultyStatus.ACTIVE);

    const {id} = context.query;
    const officerData = await OfficerController.getOfficerDetailByOfficerId(id);
    if (officerData.success && facultiesData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                faculties: facultiesData.response,
                officer: officerData.response
            }
        }
    }
}


export default function OfficerDetail({isPagePermissionSuccess, operationUserId, faculties, officer}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const {academicInfoResponse} = officer;
    const {personalInfoResponse} = officer;
    const {facultyResponse} = academicInfoResponse;

    const router = useRouter();


    /**
     * OFFICER ACTIVATE OPERATION
     */

    let [isOpenProcessingActivateNotification, setIsOpenProcessingActivateNotification] = useState(false);

    function closeProcessingActivateNotification() {
        setIsOpenProcessingActivateNotification(false);
    }

    function openProcessingActivateNotification() {
        setIsOpenProcessingActivateNotification(true);
    }

    let [isOpenSuccessActivateNotification, setIsOpenSuccessActivateNotification] = useState(false);

    function closeSuccessActivateNotification() {
        setIsOpenSuccessActivateNotification(false);
        router.reload();
    }

    function openSuccessActivateNotification() {
        setIsOpenSuccessActivateNotification(true);
    }

    let [isOpenFailActivateNotification, setIsOpenFailActivateNotification] = useState(false);

    function closeFailActivateNotification() {
        setIsOpenFailActivateNotification(false);
    }

    function openFailActivateNotification() {
        setIsOpenFailActivateNotification(true);
    }

    const activateOfficer = async (event) => {
        openProcessingActivateNotification();

        event.preventDefault();

        const officerId = academicInfoResponse.officerId;
        const officerData = await OfficerController.activateOfficer(operationUserId, officerId);
        if (officerData.success) {
            closeProcessingActivateNotification();
            openSuccessActivateNotification();
        } else {
            closeProcessingActivateNotification();
            openFailActivateNotification();
        }
    }


    /**
     * OFFICER PASSIVATE OPERATION
     */


    let [isOpenProcessingPassivateNotification, setIsOpenProcessingPassivateNotification] = useState(false);

    function closeProcessingPassivateNotification() {
        setIsOpenProcessingPassivateNotification(false);
    }

    function openProcessingPassivateNotification() {
        setIsOpenProcessingPassivateNotification(true);
    }

    let [isOpenSuccessPassivateNotification, setIsOpenSuccessPassivateNotification] = useState(false);

    function closeSuccessPassivateNotification() {
        setIsOpenSuccessPassivateNotification(false);
        router.reload();
    }

    function openSuccessPassivateNotification() {
        setIsOpenSuccessPassivateNotification(true);
    }

    let [isOpenFailPassivateNotification, setIsOpenFailPassivateNotification] = useState(false);

    function closeFailPassivateNotification() {
        setIsOpenFailPassivateNotification(false);
    }

    function openFailPassivateNotification() {
        setIsOpenFailPassivateNotification(true);
    }

    const passivateOfficer = async (event) => {
        openProcessingPassivateNotification();

        event.preventDefault();

        const officerId = academicInfoResponse.officerId;
        const officerData = await OfficerController.passivateOfficer(operationUserId, officerId);
        if (officerData.success) {
            closeProcessingPassivateNotification();
            openSuccessPassivateNotification();
        } else {
            closeProcessingPassivateNotification();
            openFailPassivateNotification();
        }
    }


    /**
     * OFFICER DELETE OPERATION
     */

    let [isOpenProcessingDeleteNotification, setIsOpenProcessingDeleteNotification] = useState(false);

    function closeProcessingDeleteNotification() {
        setIsOpenProcessingDeleteNotification(false);
    }

    function openProcessingDeleteNotification() {
        setIsOpenProcessingDeleteNotification(true);
    }

    let [isOpenSuccessDeleteNotification, setIsOpenSuccessDeleteNotification] = useState(false);

    function closeSuccessDeleteNotification() {
        setIsOpenSuccessDeleteNotification(false);
        router.reload();
    }

    function openSuccessDeleteNotification() {
        setIsOpenSuccessDeleteNotification(true);
    }

    let [isOpenFailDeleteNotification, setIsOpenFailDeleteNotification] = useState(false);

    function closeFailDeleteNotification() {
        setIsOpenFailDeleteNotification(false);
    }

    function openFailDeleteNotification() {
        setIsOpenFailDeleteNotification(true);
    }

    const deleteOfficer = async (event) => {
        openProcessingDeleteNotification();

        event.preventDefault();

        const officerId = academicInfoResponse.officerId;
        const officerData = await OfficerController.deleteOfficer(operationUserId, officerId);
        if (officerData.success) {
            closeProcessingDeleteNotification();
            openSuccessDeleteNotification();
        } else {
            closeProcessingDeleteNotification();
            openFailDeleteNotification();
        }
    }


    /**
     * OFFICER UPDATE ACADEMIC INFO OPERATION
     */

    let [isOpenProcessingAcademicInfoUpdateNotification, setIsOpenProcessingAcademicInfoUpdateNotification] = useState(false);

    function closeProcessingAcademicInfoUpdateNotification() {
        setIsOpenProcessingAcademicInfoUpdateNotification(false);
    }

    function openProcessingAcademicInfoUpdateNotification() {
        setIsOpenProcessingAcademicInfoUpdateNotification(true);
    }

    let [isOpenSuccessAcademicInfoUpdateNotification, setIsOpenSuccessAcademicInfoUpdateNotification] = useState(false);

    function closeSuccessAcademicInfoUpdateNotification() {
        setIsOpenSuccessAcademicInfoUpdateNotification(false);
        router.reload();
    }

    function openSuccessAcademicInfoUpdateNotification() {
        setIsOpenSuccessAcademicInfoUpdateNotification(true);
    }

    let [isOpenFailAcademicInfoUpdateNotification, setIsOpenFailAcademicInfoUpdateNotification] = useState(false);

    function closeFailAcademicInfoUpdateNotification() {
        setIsOpenFailAcademicInfoUpdateNotification(false);
        router.reload();
    }

    function openFailAcademicInfoUpdateNotification() {
        setIsOpenFailAcademicInfoUpdateNotification(true);
    }

    const [facultyId, setFacultyId] = useState(facultyResponse.facultyId);
    const changeFacultyId = event => {
        const facultyId = event.target.value;
        setFacultyId(facultyId);
    }

    const [academicPhoneNumber, setAcademicPhoneNumber] = useState(academicInfoResponse.phoneNumber);
    const changeAcademicPhoneNumber = event => {
        const academicPhoneNumber = event.target.value;
        setAcademicPhoneNumber(academicPhoneNumber);
    }

    const updateOfficerAcademicInfo = async (event) => {
        openProcessingAcademicInfoUpdateNotification();

        event.preventDefault();

        const officerId = academicInfoResponse.officerId;
        const phoneNumber = academicPhoneNumber;
        const academicInfo = {facultyId, phoneNumber};
        const academicInfoData = await OfficerController.updateOfficerAcademicInfo(operationUserId, officerId, academicInfo);
        if (academicInfoData.success) {
            closeProcessingAcademicInfoUpdateNotification();
            openSuccessAcademicInfoUpdateNotification();
        } else {
            closeProcessingAcademicInfoUpdateNotification();
            openFailAcademicInfoUpdateNotification();
        }
    }


    /**
     * OFFICER UPDATE PERSONAL INFO OPERATION
     */

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
        router.reload();
    }

    function openFailPersonalInfoUpdateNotification() {
        setIsOpenFailPersonalInfoUpdateNotification(true);
    }

    const [name, setName] = useState(personalInfoResponse.name);
    const changeName = event => {
        const name = event.target.value;
        setName(name);
    }

    const [surname, setSurname] = useState(personalInfoResponse.surname);
    const changeSurname = event => {
        const surname = event.target.value;
        setSurname(surname);
    }

    const [tcNo, setTcNo] = useState(personalInfoResponse.tcNo);
    const changeTcNo = event => {
        const tcNo = event.target.value;
        setTcNo(tcNo);
    }

    const [birthday, setBirthday] = useState(personalInfoResponse.birthday);
    const changeBirthday = event => {
        const birthday = event.target.value;
        setBirthday(birthday);
    }

    const [email, setEmail] = useState(personalInfoResponse.email);
    const changeEmail = event => {
        const email = event.target.value;
        setEmail(email);
    }

    const [address, setAddress] = useState(personalInfoResponse.address);
    const changeAddress = event => {
        const address = event.target.value;
        setAddress(address);
    }

    const [personalPhoneNumber, setPersonalPhoneNumber] = useState(personalInfoResponse.phoneNumber);
    const changePersonalPhoneNumber = event => {
        const personalPhoneNumber = event.target.value;
        setPersonalPhoneNumber(personalPhoneNumber);
    }

    const updateOfficerPersonalInfo = async (event) => {
        openProcessingPersonalInfoUpdateNotification();

        event.preventDefault();

        const officerId = academicInfoResponse.officerId;
        const phoneNumber = personalPhoneNumber;
        const personalInfo = {name, surname, tcNo, email, birthday, address, phoneNumber};
        const personalInfoData = await OfficerController.updateOfficerPersonalInfo(operationUserId, officerId, personalInfo);
        if (personalInfoData.success) {
            closeProcessingPersonalInfoUpdateNotification();
            openSuccessPersonalInfoUpdateNotification();
        } else {
            closeProcessingPersonalInfoUpdateNotification();
            openFailPersonalInfoUpdateNotification();
        }
    }

    const isOfficerPassiveOrDeleted = () => {
        return academicInfoResponse.status === OfficerStatus.PASSIVE || academicInfoResponse.status === OfficerStatus.DELETED
    }

    return (
        <>
            <SISTitle/>
            <OfficerNavbar/>
            <div>
                <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                    <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                        <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                            {personalInfoResponse.name} {personalInfoResponse.surname}
                        </a>
                        {OfficerStatus.getAll.map((oStatus) => (
                            academicInfoResponse.status === oStatus.enum
                                ?
                                oStatus.component
                                :
                                null
                        ))}
                        {(
                            academicInfoResponse.status === OfficerStatus.DELETED
                                ?
                                null
                                :
                                SisOperationButton.getDeleteButton(deleteOfficer, "KAYDI SİL")
                        )}

                        {(
                            academicInfoResponse.status === OfficerStatus.PASSIVE || academicInfoResponse.status === OfficerStatus.DELETED
                                ?
                                null
                                :
                                SisOperationButton.getPassivateButton(passivateOfficer, "KAYDI DONDUR")
                        )}

                        {(
                            academicInfoResponse.status === OfficerStatus.ACTIVE || academicInfoResponse.status === OfficerStatus.DELETED
                                ?
                                null
                                :
                                SisOperationButton.getActivateButton(activateOfficer, "KAYDI AKTİFLEŞTİR")
                        )}
                    </div>
                    <div className="md:col-span-1">
                        <form className="mt-10 max-w-3xl mx-auto space-y-6">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                            AKADEMİK BİLGİLER
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="officer-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                PERSONEL NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="officerId"
                                                id="officerId"
                                                defaultValue={academicInfoResponse.officerId}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-3 select-none">
                                            <label htmlFor="registration-date"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                KAYIT TARİHİ
                                            </label>
                                            <input
                                                type="text"
                                                name="registration-date"
                                                id="registration-date"
                                                defaultValue={academicInfoResponse.registrationDate}
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
                                                onChange={changeFacultyId}
                                                id="faculty"
                                                name="faculty"
                                                autoComplete="faculty-name"
                                                disabled={isOfficerPassiveOrDeleted()}
                                                className={isOfficerPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                }>
                                                {faculties.map((faculty) => (
                                                    facultyResponse.name === faculty.name
                                                        ?
                                                        <option value={faculty.facultyId}
                                                                selected>{faculty.name}</option>
                                                        :
                                                        <option
                                                            value={faculty.facultyId}>{faculty.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-span-3">
                                            <label htmlFor="phone-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DAHİLİ NUMARA
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
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                defaultValue={academicInfoResponse.phoneNumber}
                                                disabled={isOfficerPassiveOrDeleted()}
                                                className={isOfficerPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
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
                                                defaultValue={academicInfoResponse.email}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                        {(
                                            academicInfoResponse.modifiedDate !== null
                                                ?
                                                <div className="sm:col-span-6">
                                                    <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                        Son Düzenlenme Tarihi : {academicInfoResponse.modifiedDate}
                                                    </a>
                                                </div>
                                                :
                                                null
                                        )}
                                    </div>
                                </div>
                                {(
                                    isOfficerPassiveOrDeleted()
                                        ?
                                        null
                                        :
                                        SisOperationButton.getUpdateButton(updateOfficerAcademicInfo, "GÜNCELLE")
                                )}
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
                <div className="md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="mt-4 max-w-3xl mx-auto space-y-6">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                            KİŞİSEL BİLGİLER
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
                                                name="name"
                                                id="name"
                                                defaultValue={personalInfoResponse.name}
                                                disabled={isOfficerPassiveOrDeleted()}
                                                className={isOfficerPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SOYADI
                                            </label>
                                            <input
                                                onChange={changeSurname}
                                                type="text"
                                                name="surname"
                                                id="surname"
                                                defaultValue={personalInfoResponse.surname}
                                                disabled={isOfficerPassiveOrDeleted()}
                                                className={isOfficerPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
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
                                                defaultValue={personalInfoResponse.tcNo}
                                                disabled={isOfficerPassiveOrDeleted()}
                                                className={isOfficerPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
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
                                                defaultValue={personalInfoResponse.birthday}
                                                disabled={isOfficerPassiveOrDeleted()}
                                                className={isOfficerPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MAİL ADRESİ
                                            </label>
                                            <input
                                                onChange={changeEmail}
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                defaultValue={personalInfoResponse.email}
                                                disabled={isOfficerPassiveOrDeleted()}
                                                className={isOfficerPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
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
                                                defaultValue={personalInfoResponse.phoneNumber}
                                                disabled={isOfficerPassiveOrDeleted()}
                                                className={isOfficerPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
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
                                                autoComplete="home-address"
                                                defaultValue={personalInfoResponse.address}
                                                disabled={isOfficerPassiveOrDeleted()}
                                                className={isOfficerPassiveOrDeleted()
                                                    ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                }/>
                                        </div>
                                        {(
                                            personalInfoResponse.modifiedDate !== null
                                                ?
                                                <div className="sm:col-span-6">
                                                    <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                        Son Düzenlenme Tarihi : {personalInfoResponse.modifiedDate}
                                                    </a>
                                                </div>
                                                :
                                                null
                                        )}
                                    </div>
                                </div>
                                {(
                                    isOfficerPassiveOrDeleted()
                                        ?
                                        null
                                        :
                                        SisOperationButton.getUpdateButton(updateOfficerPersonalInfo, "GÜNCELLE")
                                )}


                                {/**
                                 * Activate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingActivateNotification}
                                    closeNotification={closeProcessingActivateNotification}
                                    title="Personel Kaydı Aktifleştiriliyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessActivateNotification}
                                    closeNotification={closeSuccessActivateNotification}
                                    title="Personel Kaydı Aktifleştirildi!"
                                    description="Personel Kayıt Aktifleştirme İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailActivateNotification}
                                    closeNotification={closeFailActivateNotification}
                                    title="Personel Kaydı Aktifleştirilemedi!"
                                    description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />

                                {/**
                                 * Passivate
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingPassivateNotification}
                                    closeNotification={closeProcessingPassivateNotification}
                                    title="Personel Kaydı Pasifleştiriliyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessPassivateNotification}
                                    closeNotification={closeSuccessPassivateNotification}
                                    title="Personel Kaydı Pasifleştirildi!"
                                    description="Personel Kayıt Pasifleştirme İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailPassivateNotification}
                                    closeNotification={closeFailPassivateNotification}
                                    title="Personel Kaydı Pasifleştirilemedi!"
                                    description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />

                                {/**
                                 * Delete
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingDeleteNotification}
                                    closeNotification={closeProcessingDeleteNotification}
                                    title="Personel Kaydı Siliniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessDeleteNotification}
                                    closeNotification={closeSuccessDeleteNotification}
                                    title="Personel Kaydı Silindi!"
                                    description="Personel Kayıt Silme İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailDeleteNotification}
                                    closeNotification={closeFailDeleteNotification}
                                    title="Personel Kaydı Silinemedi!"
                                    description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />

                                {/**
                                 * Academic Info Update
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingAcademicInfoUpdateNotification}
                                    closeNotification={closeProcessingAcademicInfoUpdateNotification}
                                    title="Personel Akademik Bilgileri Güncelleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessAcademicInfoUpdateNotification}
                                    closeNotification={closeSuccessAcademicInfoUpdateNotification}
                                    title="Personel Akademik Bilgileri Güncellendi!"
                                    description="Personel Akademik Bilgi Güncelleme İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailAcademicInfoUpdateNotification}
                                    closeNotification={closeFailAcademicInfoUpdateNotification}
                                    title="Personel Akademik Bilgileri Güncellenemedi!"
                                    description="Lütfen girdiğiniz verileri kontrol ediniz.
                                    Verilerinizi doğru girdiyseniz
                                    sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />

                                {/**
                                 * Personal Info Update
                                 */}
                                <ProcessNotification
                                    isOpen={isOpenProcessingPersonalInfoUpdateNotification}
                                    closeNotification={closeProcessingPersonalInfoUpdateNotification}
                                    title="Personel Kişisel Bilgileri Güncelleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessPersonalInfoUpdateNotification}
                                    closeNotification={closeSuccessPersonalInfoUpdateNotification}
                                    title="Personel Kişisel Bilgileri Güncellendi!"
                                    description="Personel Kişisel Bilgi Güncelleme İşlemi başarıyla gerçekleşti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailPersonalInfoUpdateNotification}
                                    closeNotification={closeFailPersonalInfoUpdateNotification}
                                    title="Personel Kişisel Bilgileri Güncellenemedi!"
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