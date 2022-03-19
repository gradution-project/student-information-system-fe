import SISTitle from "../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import LessonSemester from "../../../../../../../public/constants/lesson/LessonSemester";
import SisOfficerStorage from "../../../../../../../public/storage/officer/SisOfficerStorage";
import UnauthorizedAccessPage from "../../../../../../401";
import ProcessNotification from "../../../../../../../public/notifications/process";
import SuccessNotification from "../../../../../../../public/notifications/success";
import FailNotification from "../../../../../../../public/notifications/fail";
import DepartmentController from "../../../../../../../public/api/department/DepartmentController";
import DepartmentStatus from "../../../../../../../public/constants/department/DepartmentStatus";
import LessonController from "../../../../../../../public/api/lesson/LessonController";
import LessonStatus from "../../../../../../../public/constants/lesson/LessonStatus";
import SisOperationButton from "../../../../../../../public/components/buttons/SisOperationButton";
import LessonCompulsoryOrElective from "../../../../../../../public/constants/lesson/LessonCompulsoryOrElective";

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

    const {id} = context.query;
    const lessonData = await LessonController.getLessonByLessonId(id);
    if (lessonData.success && departmentsData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                departments: departmentsData.response,
                lesson: lessonData.response
            }
        }
    }
}


export default function LessonDetail({isPagePermissionSuccess, operationUserId, departments, lesson}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const {departmentResponse} = lesson;
    const {facultyResponse} = departmentResponse;

    const router = useRouter();


    /**
     * LESSON ACTIVATE OPERATION
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

    const activateLesson = async (event) => {
        openProcessingActivateNotification();

        event.preventDefault();

        const lessonId = lesson.lessonId;
        const lessonData = await LessonController.activateLesson(operationUserId, lessonId);
        if (lessonData.success) {
            closeProcessingActivateNotification();
            openSuccessActivateNotification();
        } else {
            closeProcessingActivateNotification();
            openFailActivateNotification();
        }
    }


    /**
     * LESSON PASSIVATE OPERATION
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

    const passivateLesson = async (event) => {
        openProcessingPassivateNotification();

        event.preventDefault();

        const lessonId = lesson.lessonId;
        const lessonData = await LessonController.passivateLesson(operationUserId, lessonId);
        if (lessonData.success) {
            closeProcessingPassivateNotification();
            openSuccessPassivateNotification();
        } else {
            closeProcessingPassivateNotification();
            openFailPassivateNotification();
        }
    }


    /**
     * LESSON DELETE OPERATION
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

    const deleteLesson = async (event) => {
        openProcessingDeleteNotification();

        event.preventDefault();

        const lessonId = lesson.lessonId;
        const lessonData = await LessonController.deleteLesson(operationUserId, lessonId);
        if (lessonData.success) {
            closeProcessingDeleteNotification();
            openSuccessDeleteNotification()
        } else {
            closeProcessingDeleteNotification();
            openFailDeleteNotification();
        }
    }


    /**
     * LESSON UPDATE OPERATION
     */

    let [isOpenProcessingUpdateNotification, setIsOpenProcessingUpdateNotification] = useState(false);

    function closeProcessingUpdateNotification() {
        setIsOpenProcessingUpdateNotification(false);
    }

    function openProcessingUpdateNotification() {
        setIsOpenProcessingUpdateNotification(true);
    }

    let [isOpenSuccessUpdateNotification, setIsOpenSuccessUpdateNotification] = useState(false);

    function closeSuccessUpdateNotification() {
        setIsOpenSuccessUpdateNotification(false);
        router.reload();
    }

    function openSuccessUpdateNotification() {
        setIsOpenSuccessUpdateNotification(true);
    }

    let [isOpenFailUpdateNotification, setIsOpenFailUpdateNotification] = useState(false);

    function closeFailUpdateNotification() {
        setIsOpenFailUpdateNotification(false);
    }

    function openFailUpdateNotification() {
        setIsOpenFailUpdateNotification(true);
    }

    const [departmentId, setDepartmentId] = useState(departmentResponse.departmentId);
    const changeDepartmentId = event => {
        const departmentId = event.target.value;
        setDepartmentId(departmentId);
    }

    const [name, setName] = useState(lesson.name);
    const changeName = event => {
        const name = event.target.value;
        setName(name);
    }

    const [credit, setCredit] = useState(lesson.credit);
    const changeCredit = event => {
        const credit = event.target.value;
        setCredit(credit);
    }

    const [compulsoryOrElective, setCompulsoryOrElective] = useState(lesson.compulsoryOrElective);
    const changeCompulsoryOrElective = event => {
        const compulsoryOrElective = event.target.value;
        setCompulsoryOrElective(compulsoryOrElective);
    }

    const [semester, setSemester] = useState(lesson.semester);
    const changeSemester = event => {
        const semester = event.target.value;
        setSemester(semester);
    }

    const lessonUpdate = async (event) => {
        openProcessingUpdateNotification();

        event.preventDefault();

        const lessonId = lesson.lessonId;
        const lessonInfo = {departmentId, name, credit, compulsoryOrElective, semester};
        const lessonData = await LessonController.updateLesson(operationUserId, lessonId, lessonInfo);
        if (lessonData.success) {
            closeProcessingUpdateNotification();
            openSuccessUpdateNotification();
        } else {
            closeProcessingUpdateNotification();
            openFailUpdateNotification();
        }
    }

    const isLessonPassiveOrDeleted = () => {
        return lesson.status === LessonStatus.PASSIVE || lesson.status === LessonStatus.DELETED
    }

    return (
        <>
            <SISTitle/>
            <OfficerNavbar/>
            <div>
                <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                            <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                                {lesson.name}
                            </a>
                            {LessonStatus.getAll.map((lessonStatus) => (
                                lesson.status === lessonStatus.enum
                                    ?
                                    lessonStatus.component
                                    :
                                    null
                            ))}
                            {(
                                lesson.status === LessonStatus.DELETED
                                    ?
                                    null
                                    :
                                    SisOperationButton.getDeleteButton(deleteLesson, "DERSİ SİL")
                            )}
                            {(
                                lesson.status === LessonStatus.PASSIVE || lesson.status === LessonStatus.DELETED
                                    ?
                                    null
                                    :
                                    SisOperationButton.getPassivateButton(passivateLesson, "DERSİ PASİFLEŞTİR")
                            )}
                            {(
                                lesson.status === LessonStatus.ACTIVE || lesson.status === LessonStatus.DELETED
                                    ?
                                    null
                                    :
                                    SisOperationButton.getActivateButton(activateLesson, "DERSİ AKTİFLEŞTİR")
                            )}
                        </div>
                        <div className="select-none mt-10 py-4 sm:mt-0">
                            <form className="mt-5 px-4 max-w-3xl mx-auto space-y-6">
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                            <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                                DERS BİLGİLERİ
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="sm:col-span-3">
                                                <label htmlFor="lessonId"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    DERS NUMARASI
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lessonId"
                                                    id="lessonId"
                                                    defaultValue={lesson.lessonId}
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
                                                    <option
                                                        defaultValue={facultyResponse.facultyId}>{facultyResponse.name}</option>
                                                </select>
                                            </div>

                                            <div className="sm:col-span-3">
                                                <label htmlFor="department"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    BÖLÜMÜ
                                                </label>
                                                <select
                                                    onChange={changeDepartmentId}
                                                    id="department-id"
                                                    name="department-id"
                                                    autoComplete="department-id"
                                                    disabled={isLessonPassiveOrDeleted()}
                                                    className={isLessonPassiveOrDeleted()
                                                        ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                        : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    }>
                                                    {departments.map((department) => (
                                                        departmentResponse.name === department.name
                                                            ?
                                                            <option key={department.departmentId}
                                                                    value={department.departmentId}
                                                                    selected>{department.name}</option>
                                                            :
                                                            <option key={department.departmentId}
                                                                    value={department.departmentId}>{department.name}</option>
                                                    ))}
                                                </select>
                                            </div>


                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="name"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    DERSİN ADI
                                                </label>
                                                <input
                                                    onChange={changeName}
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    required
                                                    defaultValue={lesson.name}
                                                    disabled={isLessonPassiveOrDeleted()}
                                                    className={isLessonPassiveOrDeleted()
                                                        ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                        : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    }/>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="credit"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    DERSİN KREDİSİ
                                                </label>
                                                <input
                                                    onChange={changeCredit}
                                                    type="text"
                                                    name="credit"
                                                    id="credit"
                                                    required
                                                    defaultValue={lesson.credit}
                                                    disabled={isLessonPassiveOrDeleted()}
                                                    className={isLessonPassiveOrDeleted()
                                                        ? "font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                        : "font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                    }/>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="semester"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    DERS DÖNEMİ
                                                </label>
                                                <select
                                                    onChange={changeSemester}
                                                    id="semester"
                                                    name="semester"
                                                    disabled={isLessonPassiveOrDeleted()}
                                                    className={isLessonPassiveOrDeleted()
                                                        ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                        : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    }>
                                                    {LessonSemester.getAll.map(lSemester => (
                                                        lesson.semester === lSemester.enum
                                                            ?
                                                            <option key={lSemester.enum}
                                                                    value={lSemester.enum}
                                                                    selected>{lSemester.tr}</option>
                                                            :
                                                            <option key={lSemester.enum}
                                                                    value={lSemester.enum}>{lSemester.tr}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="compulsoryOrElective"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    DERS ZORUNLULUĞU
                                                </label>
                                                <select
                                                    onChange={changeCompulsoryOrElective}
                                                    id="compulsoryOrElective"
                                                    name="compulsoryOrElective"
                                                    disabled={isLessonPassiveOrDeleted()}
                                                    className={isLessonPassiveOrDeleted()
                                                        ? "font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                        : "font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                                    }>
                                                    {LessonCompulsoryOrElective.getAll.map((lCompulsory) => (
                                                        lesson.compulsoryOrElective === lCompulsory.enum
                                                            ?
                                                            <option key={lCompulsory.enum} value={lCompulsory.enum}
                                                                    selected>{lCompulsory.tr}</option>
                                                            :
                                                            <option key={lCompulsory.enum}
                                                                    value={lCompulsory.enum}>{lCompulsory.tr}</option>

                                                    ))}
                                                </select>
                                            </div>

                                            {(
                                                lesson.modifiedDate !== null
                                                    ?
                                                    <div className="sm:col-span-6">
                                                        <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                            Son Düzenlenme Tarihi : {lesson.modifiedDate}
                                                        </a>
                                                    </div>
                                                    :
                                                    null
                                            )}
                                        </div>
                                    </div>
                                    {(
                                        isLessonPassiveOrDeleted()
                                            ?
                                            null
                                            :
                                            SisOperationButton.getUpdateButton(lessonUpdate, "GÜNCELLE")
                                    )}

                                    {/**
                                     * Activate
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingActivateNotification}
                                        closeNotification={closeProcessingActivateNotification}
                                        title="Ders Aktifleştirme İsteğiniz İşleniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessActivateNotification}
                                        closeNotification={closeSuccessActivateNotification}
                                        title="Ders Aktifleştime İşlemi Başarılı!"
                                        description="Ders Aktifleştirildi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailActivateNotification}
                                        closeNotification={closeFailActivateNotification}
                                        title="Ders Aktifleştirme İşlemi Başarısız!"
                                        description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                    />

                                    {/**
                                     * Passivate
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingPassivateNotification}
                                        closeNotification={closeProcessingPassivateNotification}
                                        title="Ders Bilgi Güncelleme İsteğiniz İşleniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessPassivateNotification}
                                        closeNotification={closeSuccessPassivateNotification}
                                        title="Ders Pasifleştirme İşlemi Başarılı!"
                                        description="Ders Pasifleştirildi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailPassivateNotification}
                                        closeNotification={closeFailPassivateNotification}
                                        title="Ders Pasifleştirme İşlemi Başarısız!"
                                        description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                    />

                                    {/**
                                     * Delete
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingDeleteNotification}
                                        closeNotification={closeProcessingDeleteNotification}
                                        title="Ders Silme İsteğiniz İşleniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessDeleteNotification}
                                        closeNotification={closeSuccessDeleteNotification}
                                        title="Ders Silme İşlemi Başarılı!"
                                        description="Ders Silindi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailDeleteNotification}
                                        closeNotification={closeFailDeleteNotification}
                                        title="Ders Silme İşlemi Başarısız!"
                                        description="Sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                    />

                                    {/**
                                     * Update
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingUpdateNotification}
                                        closeNotification={closeProcessingUpdateNotification}
                                        title="Ders Bilgi Güncelleme İsteğiniz İşleniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessUpdateNotification}
                                        closeNotification={closeSuccessUpdateNotification}
                                        title="Ders Bilgi Güncelleme İşlemi Başarılı!"
                                        description="Ders Bilgi Güncellene İşlemi başarıyla gerçekleşti."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailUpdateNotification}
                                        closeNotification={closeFailUpdateNotification}
                                        title="Ders Bilgi Güncelleme İşlemi Başarısız!"
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
        </>
    )
}