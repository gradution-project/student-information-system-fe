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
import PageNotFound from "../../../../../../404";

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
                isDataFound: true,
                operationUserId: officerId,
                departments: departmentsData.response,
                lesson: lessonData.response
            }
        }
    } else {
        return {
            props: {
                isPagePermissionSuccess: true,
                isDataFound: false
            }
        }
    }
}


export default function LessonDetail({isPagePermissionSuccess, isDataFound, operationUserId, departments, lesson}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    if (!isDataFound) {
        return (
            <PageNotFound user="/officer"/>
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
        setDepartmentId(event.target.value);
    }

    const [name, setName] = useState(lesson.name);
    const changeName = event => {
        setName(event.target.value);
    }

    const [credit, setCredit] = useState(lesson.credit);
    const changeCredit = event => {
        setCredit(event.target.value);
    }

    const [theoreticalHours, setTheoreticalHours] = useState(lesson.theoreticalHours);
    const changeTheoreticalHours = event => {
        setTheoreticalHours(event.target.value);
    }

    const [practiceHours, setPracticeHours] = useState(lesson.practiceHours);
    const changePracticeHours = event => {
        setPracticeHours(event.target.value);
    }

    const [compulsoryOrElective, setCompulsoryOrElective] = useState(lesson.compulsoryOrElective);
    const changeCompulsoryOrElective = event => {
        setCompulsoryOrElective(event.target.value);
    }

    const [semester, setSemester] = useState(lesson.semester);
    const changeSemester = event => {
        setSemester(event.target.value);
    }

    const lessonUpdate = async (event) => {
        openProcessingUpdateNotification();

        event.preventDefault();

        const lessonId = lesson.lessonId;
        const lessonInfo = {departmentId, name, credit, theoreticalHours, practiceHours, compulsoryOrElective, semester};
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
                                    SisOperationButton.getDeleteButton(deleteLesson, "DERS?? S??L")
                            )}
                            {(
                                lesson.status === LessonStatus.PASSIVE || lesson.status === LessonStatus.DELETED
                                    ?
                                    null
                                    :
                                    SisOperationButton.getPassivateButton(passivateLesson, "DERS?? PAS??FLE??T??R")
                            )}
                            {(
                                lesson.status === LessonStatus.ACTIVE || lesson.status === LessonStatus.DELETED
                                    ?
                                    null
                                    :
                                    SisOperationButton.getActivateButton(activateLesson, "DERS?? AKT??FLE??T??R")
                            )}
                        </div>
                        <div className="select-none mt-10 py-4 sm:mt-0">
                            <form className="mt-5 px-4 max-w-3xl mx-auto space-y-6">
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                            <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                                DERS B??LG??LER??
                                            </h3>
                                        </div>
                                        <div className="grid grid-cols-6 gap-6">

                                            <div className="sm:col-span-6">
                                                <label htmlFor="faculty"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    FAK??LTE
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

                                            <div className="sm:col-span-6">
                                                <label htmlFor="department"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    B??L??M
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

                                            <div className="sm:col-span-1">
                                                <label htmlFor="lessonId"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    DERS KODU
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

                                            <div className="col-span-6 sm:col-span-5">
                                                <label htmlFor="name"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    DERS??N ADI
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

                                            <div className="col-span-6 sm:col-span-2">
                                                <label htmlFor="credit"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    DERS??N KRED??S??
                                                </label>
                                                <input
                                                    onChange={(e) => {
                                                        if (e.target.value.length > 2) {
                                                            e.target.value = "99"
                                                        }
                                                        if (e.target.value >= 99) {
                                                            e.target.value = "99"
                                                        }
                                                        if (e.target.value <= 0) {
                                                            e.target.value = "0"
                                                        }
                                                        changeCredit(e)
                                                    }}
                                                    type="number"
                                                    min={100}
                                                    min={0}
                                                    name="credit"
                                                    id="credit"
                                                    defaultValue={lesson.credit}
                                                    required
                                                    className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-2">
                                                <label htmlFor="credit"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    TEOR??K DERS SAAT??
                                                </label>
                                                <input
                                                    onChange={(e) => {
                                                        if (e.target.value.length > 2) {
                                                            e.target.value = "99"
                                                        }
                                                        if (e.target.value >= 99) {
                                                            e.target.value = "99"
                                                        }
                                                        if (e.target.value <= 0) {
                                                            e.target.value = "0"
                                                        }
                                                        changeTheoreticalHours(e)
                                                    }}
                                                    type="number"
                                                    min={100}
                                                    min={0}
                                                    name="theoreticalHours"
                                                    id="theoreticalHours"
                                                    defaultValue={lesson.theoreticalHours}
                                                    required
                                                    className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-2">
                                                <label htmlFor="credit"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    UYGULAMA DERS SAAT??
                                                </label>
                                                <input
                                                    onChange={(e) => {
                                                        if (e.target.value.length > 2) {
                                                            e.target.value = "99"
                                                        }
                                                        if (e.target.value >= 99) {
                                                            e.target.value = "99"
                                                        }
                                                        if (e.target.value <= 0) {
                                                            e.target.value = "0"
                                                        }
                                                        changePracticeHours(e)
                                                    }}
                                                    type="number"
                                                    min={100}
                                                    min={0}
                                                    name="practiceHours"
                                                    id="practiceHours"
                                                    defaultValue={lesson.practiceHours}
                                                    required
                                                    className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="semester"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    DERS D??NEM??
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
                                                    DERS ZORUNLULU??U
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
                                                            Son D??zenlenme Tarihi : {lesson.modifiedDate}
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
                                            SisOperationButton.getUpdateButton(lessonUpdate, "G??NCELLE")
                                    )}

                                    {/**
                                     * Activate
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingActivateNotification}
                                        closeNotification={closeProcessingActivateNotification}
                                        title="Ders Aktifle??tirme ??ste??iniz ????leniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessActivateNotification}
                                        closeNotification={closeSuccessActivateNotification}
                                        title="Ders Aktifle??time ????lemi Ba??ar??l??!"
                                        description="Ders Aktifle??tirildi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailActivateNotification}
                                        closeNotification={closeFailActivateNotification}
                                        title="Ders Aktifle??tirme ????lemi Ba??ar??s??z!"
                                        description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                    />

                                    {/**
                                     * Passivate
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingPassivateNotification}
                                        closeNotification={closeProcessingPassivateNotification}
                                        title="Ders Bilgi G??ncelleme ??ste??iniz ????leniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessPassivateNotification}
                                        closeNotification={closeSuccessPassivateNotification}
                                        title="Ders Pasifle??tirme ????lemi Ba??ar??l??!"
                                        description="Ders Pasifle??tirildi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailPassivateNotification}
                                        closeNotification={closeFailPassivateNotification}
                                        title="Ders Pasifle??tirme ????lemi Ba??ar??s??z!"
                                        description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                    />

                                    {/**
                                     * Delete
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingDeleteNotification}
                                        closeNotification={closeProcessingDeleteNotification}
                                        title="Ders Silme ??ste??iniz ????leniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessDeleteNotification}
                                        closeNotification={closeSuccessDeleteNotification}
                                        title="Ders Silme ????lemi Ba??ar??l??!"
                                        description="Ders Silindi."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailDeleteNotification}
                                        closeNotification={closeFailDeleteNotification}
                                        title="Ders Silme ????lemi Ba??ar??s??z!"
                                        description="Sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                    />

                                    {/**
                                     * Update
                                     */}
                                    <ProcessNotification
                                        isOpen={isOpenProcessingUpdateNotification}
                                        closeNotification={closeProcessingUpdateNotification}
                                        title="Ders Bilgi G??ncelleme ??ste??iniz ????leniyor..."
                                    />

                                    <SuccessNotification
                                        isOpen={isOpenSuccessUpdateNotification}
                                        closeNotification={closeSuccessUpdateNotification}
                                        title="Ders Bilgi G??ncelleme ????lemi Ba??ar??l??!"
                                        description="Ders Bilgi G??ncellene ????lemi ba??ar??yla ger??ekle??ti."
                                    />

                                    <FailNotification
                                        isOpen={isOpenFailUpdateNotification}
                                        closeNotification={closeFailUpdateNotification}
                                        title="Ders Bilgi G??ncelleme ????lemi Ba??ar??s??z!"
                                        description="L??tfen girdi??iniz verileri kontrol ediniz.
                                        Verilerinizi do??ru girdiyseniz
                                        sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
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