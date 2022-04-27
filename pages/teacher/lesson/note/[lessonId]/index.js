import SisTeacherStorage from "../../../../../public/storage/teacher/SisTeacherStorage";
import UnauthorizedAccessPage from "../../../../401";
import SISTitle from "../../../../../public/components/page-titles";
import TeacherNavbar from "../../../../../public/components/navbar/teacher/teacher-navbar";
import StudentLessonNoteController from "../../../../../public/api/student/lesson/note/StudentLessonNoteController";
import LessonNoteStatus from "../../../../../public/constants/lesson/note/LessonNoteStatus";
import {useState} from "react";
import {useRouter} from "next/router";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";
import FeatureToggleController from "../../../../../public/api/university/FeatureToggleController";
import FeatureToggleName from "../../../../../public/constants/university/FeatureToggleName";
import PageNotFound from "../../../../404";
import LessonNoteState from "../../../../../public/constants/lesson/note/LessonNoteState";

export async function getServerSideProps(context) {
    const teacherId = SisTeacherStorage.getNumberWithContext(context);
    if (teacherId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const noteOperationsToggleData = await FeatureToggleController.isFeatureToggleEnabled(FeatureToggleName.NOTE_OPERATIONS);
    const midtermNoteToggleData = await FeatureToggleController.isFeatureToggleEnabled(FeatureToggleName.MIDTERM_NOTE_OPERATIONS);
    const finalNoteToggleData = await FeatureToggleController.isFeatureToggleEnabled(FeatureToggleName.FINAL_NOTE_OPERATIONS);
    const resitNoteToggleData = await FeatureToggleController.isFeatureToggleEnabled(FeatureToggleName.RESIT_NOTE_OPERATIONS);

    const {lessonId} = context.query;
    const studentsLessonNotesData = await StudentLessonNoteController.getAllStudentsLessonNotesByLessonId(lessonId);
    if (studentsLessonNotesData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                isDataFound: true,
                isNoteOperationsFeatureToggleEnabled: noteOperationsToggleData.response.isFeatureToggleEnabled,
                isMidtermNoteFeatureToggleEnabled: midtermNoteToggleData.response.isFeatureToggleEnabled,
                isFinalNoteFeatureToggleEnabled: finalNoteToggleData.response.isFeatureToggleEnabled,
                isResitNoteFeatureToggleEnabled: resitNoteToggleData.response.isFeatureToggleEnabled,
                operationUserId: teacherId,
                studentsLessonNotes: studentsLessonNotesData.response
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

export default function TeacherLessonNotesList({
                                                   isPagePermissionSuccess,
                                                   isDataFound,
                                                   operationUserId,
                                                   isNoteOperationsFeatureToggleEnabled,
                                                   isMidtermNoteFeatureToggleEnabled,
                                                   isFinalNoteFeatureToggleEnabled,
                                                   isResitNoteFeatureToggleEnabled,
                                                   studentsLessonNotes
                                               }) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="teacher"/>
        )
    }

    if (!isDataFound) {
        return (
            <PageNotFound user="/officer"/>
        )
    }

    if (!isNoteOperationsFeatureToggleEnabled) {
        return (
            <PageNotFound user="teacher"/>
        )
    }


    const router = useRouter();

    /**
     * STUDENT MIDTERM NOTE UPDATE OPERATION
     */

    let [isOpenProcessingMidtermNoteUpdateNotification, setIsOpenProcessingMidtermNoteUpdateNotification] = useState(false);

    function closeProcessingMidtermNoteUpdateNotification() {
        setIsOpenProcessingMidtermNoteUpdateNotification(false);
    }

    function openProcessingMidtermNoteUpdateNotification() {
        setIsOpenProcessingMidtermNoteUpdateNotification(true);
    }

    let [isOpenSuccessMidtermNoteUpdateNotification, setIsOpenSuccessMidtermNoteUpdateNotification] = useState(false);

    function closeSuccessMidtermNoteUpdateNotification() {
        setIsOpenSuccessMidtermNoteUpdateNotification(false);
        router.reload();
    }

    function openSuccessMidtermNoteUpdateNotification() {
        setIsOpenSuccessMidtermNoteUpdateNotification(true);
    }

    let [isOpenFailMidtermNoteUpdateNotification, setIsOpenFailMidtermNoteUpdateNotification] = useState(false);

    function closeFailMidtermNoteUpdateNotification() {
        setIsOpenFailMidtermNoteUpdateNotification(false);
    }

    function openFailMidtermNoteUpdateNotification() {
        setIsOpenFailMidtermNoteUpdateNotification(true);
    }

    const midtermNoteIdsAndNotes = new Map();
    const setMidtermNoteToMap = async (lessonNoteId, midtermNote) => {
        if (!(midtermNote < 0 || midtermNote > 100)) {
            midtermNoteIdsAndNotes.set(lessonNoteId, midtermNote)
        }
    }

    const updateStudentsMidtermNotes = async () => {
        openProcessingMidtermNoteUpdateNotification();

        const studentLessonNotesData = await StudentLessonNoteController
            .updateStudentsLessonMidtermNotes(operationUserId, Object.fromEntries(midtermNoteIdsAndNotes));

        if (studentLessonNotesData.success) {
            closeProcessingMidtermNoteUpdateNotification();
            openSuccessMidtermNoteUpdateNotification();
        } else {
            closeProcessingMidtermNoteUpdateNotification();
            openFailMidtermNoteUpdateNotification();
        }
    }

    /**
     * STUDENT RESIT NOTE CONFIRM OPERATION
     */

    let [isOpenProcessingMidtermNoteConfirmNotification, setIsOpenProcessingMidtermNoteConfirmNotification] = useState(false);

    function closeProcessingMidtermNoteConfirmNotification() {
        setIsOpenProcessingMidtermNoteConfirmNotification(false);
    }

    function openProcessingMidtermNoteConfirmNotification() {
        setIsOpenProcessingMidtermNoteConfirmNotification(true);
    }

    let [isOpenSuccessMidtermNoteConfirmNotification, setIsOpenSuccessMidtermNoteConfirmNotification] = useState(false);

    function closeSuccessMidtermNoteConfirmNotification() {
        setIsOpenSuccessMidtermNoteConfirmNotification(false);
        router.reload();
    }

    function openSuccessMidtermNoteConfirmNotification() {
        setIsOpenSuccessMidtermNoteConfirmNotification(true);
    }

    let [isOpenFailMidtermNoteConfirmNotification, setIsOpenFailMidtermNoteConfirmNotification] = useState(false);

    function closeFailMidtermNoteConfirmNotification() {
        setIsOpenFailMidtermNoteConfirmNotification(false);
    }

    function openFailMidtermNoteConfirmNotification() {
        setIsOpenFailMidtermNoteConfirmNotification(true);
    }


    const [lessonMidtermNoteIds] = useState([])
    {
        isMidtermNoteFeatureToggleEnabled
            ?
            studentsLessonNotes.map((studentLessonNotes) => (
                studentLessonNotes.midtermNoteState === LessonNoteState.CONFIRMED
                    ?
                    null
                    :
                    lessonMidtermNoteIds.push(studentLessonNotes.id)
            ))
            :
            null
    }

    const confirmStudentsMidtermNotes = async () => {
        openProcessingMidtermNoteConfirmNotification();

        let notEnteredLessonNotesCount = 0
        studentsLessonNotes.map((studentLessonNotes) => (
            studentLessonNotes.midtermNoteState === LessonNoteState.NOT_ENTERED
                ?
                notEnteredLessonNotesCount += 1
                :
                null
        ))
        if (notEnteredLessonNotesCount === 0) {
            const studentLessonNotesData = await StudentLessonNoteController
                .confirmStudentsLessonMidtermNotes(operationUserId, lessonMidtermNoteIds);

            if (studentLessonNotesData.success) {
                closeProcessingMidtermNoteConfirmNotification();
                openSuccessMidtermNoteConfirmNotification();
            } else {
                closeProcessingMidtermNoteConfirmNotification();
                openFailMidtermNoteConfirmNotification();
            }
        } else {
            closeProcessingMidtermNoteConfirmNotification();
            openFailMidtermNoteConfirmNotification();
        }

    }

    /**
     * STUDENT FINAL NOTE UPDATE OPERATION
     */

    let [isOpenProcessingFinalNoteUpdateNotification, setIsOpenProcessingFinalNoteUpdateNotification] = useState(false);

    function closeProcessingFinalNoteUpdateNotification() {
        setIsOpenProcessingFinalNoteUpdateNotification(false);
    }

    function openProcessingFinalNoteUpdateNotification() {
        setIsOpenProcessingFinalNoteUpdateNotification(true);
    }

    let [isOpenSuccessFinalNoteUpdateNotification, setIsOpenSuccessFinalNoteUpdateNotification] = useState(false);

    function closeSuccessFinalNoteUpdateNotification() {
        setIsOpenSuccessFinalNoteUpdateNotification(false);
        router.reload();
    }

    function openSuccessFinalNoteUpdateNotification() {
        setIsOpenSuccessFinalNoteUpdateNotification(true);
    }

    let [isOpenFailFinalNoteUpdateNotification, setIsOpenFailFinalNoteUpdateNotification] = useState(false);

    function closeFailFinalNoteUpdateNotification() {
        setIsOpenFailFinalNoteUpdateNotification(false);
    }

    function openFailFinalNoteUpdateNotification() {
        setIsOpenFailFinalNoteUpdateNotification(true);
    }

    const finalNoteIdsAndNotes = new Map();
    const setFinalNoteToMap = async (lessonNoteId, finalNote) => {
        if (!(finalNote < 0 || finalNote > 100)) {
            finalNoteIdsAndNotes.set(lessonNoteId, finalNote)
        }
    }

    const updateStudentsFinalNotes = async () => {
        openProcessingFinalNoteUpdateNotification();

        const studentLessonNotesData = await StudentLessonNoteController
            .updateStudentsLessonFinalNotes(operationUserId, Object.fromEntries(finalNoteIdsAndNotes));

        if (studentLessonNotesData.success) {
            closeProcessingFinalNoteUpdateNotification()
            openSuccessFinalNoteUpdateNotification()
        } else {
            closeProcessingFinalNoteUpdateNotification()
            openFailFinalNoteUpdateNotification()
        }
    }

    /**
     * STUDENT FINAL NOTE CONFIRM OPERATION
     */

    let [isOpenProcessingFinalNoteConfirmNotification, setIsOpenProcessingFinalNoteConfirmNotification] = useState(false);

    function closeProcessingFinalNoteConfirmNotification() {
        setIsOpenProcessingFinalNoteConfirmNotification(false);
    }

    function openProcessingFinalNoteConfirmNotification() {
        setIsOpenProcessingFinalNoteConfirmNotification(true);
    }

    let [isOpenSuccessFinalNoteConfirmNotification, setIsOpenSuccessFinalNoteConfirmNotification] = useState(false);

    function closeSuccessFinalNoteConfirmNotification() {
        setIsOpenSuccessFinalNoteConfirmNotification(false);
        router.reload();
    }

    function openSuccessFinalNoteConfirmNotification() {
        setIsOpenSuccessFinalNoteConfirmNotification(true);
    }

    let [isOpenFailFinalNoteConfirmNotification, setIsOpenFailFinalNoteConfirmNotification] = useState(false);

    function closeFailFinalNoteConfirmNotification() {
        setIsOpenFailFinalNoteConfirmNotification(false);
    }

    function openFailFinalNoteConfirmNotification() {
        setIsOpenFailFinalNoteConfirmNotification(true);
    }


    const [lessonFinalNoteIds] = useState([])
    {
        isFinalNoteFeatureToggleEnabled
            ?
            studentsLessonNotes.map((studentLessonNotes) => (
                studentLessonNotes.finalNoteState === LessonNoteState.CONFIRMED
                    ?
                    null
                    :
                    lessonFinalNoteIds.push(studentLessonNotes.id)
            ))
            :
            null
    }

    const confirmStudentsFinalNotes = async () => {
        openProcessingFinalNoteConfirmNotification();

        let notEnteredLessonNotesCount = 0
        studentsLessonNotes.map((studentLessonNotes) => (
            studentLessonNotes.finalNoteState === LessonNoteState.NOT_ENTERED
                ?
                notEnteredLessonNotesCount += 1
                :
                null
        ))
        if (notEnteredLessonNotesCount === 0) {
            const studentLessonNotesData = await StudentLessonNoteController
                .confirmStudentsLessonFinalNotes(operationUserId, lessonFinalNoteIds);

            if (studentLessonNotesData.success) {
                closeProcessingFinalNoteConfirmNotification();
                openSuccessFinalNoteConfirmNotification();
            } else {
                closeProcessingFinalNoteConfirmNotification();
                openFailFinalNoteConfirmNotification();
            }
        } else {
            closeProcessingFinalNoteConfirmNotification();
            openFailFinalNoteConfirmNotification();
        }
    }


    /**
     * STUDENT RESIT NOTE UPDATE OPERATION
     */

    let [isOpenProcessingResitNoteUpdateNotification, setIsOpenProcessingResitNoteUpdateNotification] = useState(false);

    function closeProcessingResitNoteUpdateNotification() {
        setIsOpenProcessingResitNoteUpdateNotification(false);
    }

    function openProcessingResitNoteUpdateNotification() {
        setIsOpenProcessingResitNoteUpdateNotification(true);
    }

    let [isOpenSuccessResitNoteUpdateNotification, setIsOpenSuccessResitNoteUpdateNotification] = useState(false);

    function closeSuccessResitNoteUpdateNotification() {
        setIsOpenSuccessResitNoteUpdateNotification(false);
        router.reload();
    }

    function openSuccessResitNoteUpdateNotification() {
        setIsOpenSuccessResitNoteUpdateNotification(true);
    }

    let [isOpenFailResitNoteUpdateNotification, setIsOpenFailResitNoteUpdateNotification] = useState(false);

    function closeFailResitNoteUpdateNotification() {
        setIsOpenFailResitNoteUpdateNotification(false);
    }

    function openFailResitNoteUpdateNotification() {
        setIsOpenFailResitNoteUpdateNotification(true);
    }

    const resitNoteIdsAndNotes = new Map();
    const setResitNoteToMap = async (lessonNoteId, resitNote) => {
        if (!(resitNote < 0 || resitNote > 100)) {
            resitNoteIdsAndNotes.set(lessonNoteId, resitNote)
        }
    }

    const updateStudentsResitNotes = async () => {
        openProcessingResitNoteUpdateNotification();

        if (resitNoteIdsAndNotes.size > 0) {
            const studentLessonNotesData = await StudentLessonNoteController
                .updateStudentsLessonResitNotes(operationUserId, Object.fromEntries(resitNoteIdsAndNotes));

            if (studentLessonNotesData.success) {
                closeProcessingResitNoteUpdateNotification();
                openSuccessResitNoteUpdateNotification();
            } else {
                closeProcessingResitNoteUpdateNotification();
                openFailResitNoteUpdateNotification();
            }
        } else {
            closeProcessingResitNoteUpdateNotification();
            openFailResitNoteUpdateNotification();
        }
    }

    /**
     * STUDENT RESIT NOTE CONFIRM OPERATION
     */

    let [isOpenProcessingResitNoteConfirmNotification, setIsOpenProcessingResitNoteConfirmNotification] = useState(false);

    function closeProcessingResitNoteConfirmNotification() {
        setIsOpenProcessingResitNoteConfirmNotification(false);
    }

    function openProcessingResitNoteConfirmNotification() {
        setIsOpenProcessingResitNoteConfirmNotification(true);
    }

    let [isOpenSuccessResitNoteConfirmNotification, setIsOpenSuccessResitNoteConfirmNotification] = useState(false);

    function closeSuccessResitNoteConfirmNotification() {
        setIsOpenSuccessResitNoteConfirmNotification(false);
        router.reload();
    }

    function openSuccessResitNoteConfirmNotification() {
        setIsOpenSuccessResitNoteConfirmNotification(true);
    }

    let [isOpenFailResitNoteConfirmNotification, setIsOpenFailResitNoteConfirmNotification] = useState(false);

    function closeFailResitNoteConfirmNotification() {
        setIsOpenFailResitNoteConfirmNotification(false);
    }

    function openFailResitNoteConfirmNotification() {
        setIsOpenFailResitNoteConfirmNotification(true);
    }


    const [lessonResitNoteIds] = useState([])
    {
        isResitNoteFeatureToggleEnabled
            ?
            studentsLessonNotes.map((studentLessonNotes) => (
                studentLessonNotes.resitNoteState === LessonNoteState.CONFIRMED
                ||
                (
                    studentLessonNotes.resitNoteState === LessonNoteState.NOT_ENTERED
                    &&
                    studentLessonNotes.status === LessonNoteStatus.PASSED
                )
                    ?
                    null
                    :
                    lessonResitNoteIds.push(studentLessonNotes.id)
            ))
            :
            null
    }

    const confirmStudentsResitNotes = async () => {
        openProcessingResitNoteConfirmNotification();

        let notEnteredLessonNotesCount = 0
        studentsLessonNotes.map((studentLessonNotes) => (
            (
                studentLessonNotes.resitNoteState === LessonNoteState.NOT_ENTERED
                &&
                studentLessonNotes.status === LessonNoteStatus.UNFINALISED
            )
            ||
            (
                studentLessonNotes.resitNoteState === LessonNoteState.UNCONFIRMED
                &&
                studentLessonNotes.status === LessonNoteStatus.UNFINALISED
            )
                ?
                notEnteredLessonNotesCount += 1
                :
                null
        ))

        if (notEnteredLessonNotesCount === 0) {
            const studentLessonNotesData = await StudentLessonNoteController
                .confirmStudentsLessonResitNotes(operationUserId, lessonResitNoteIds);

            if (studentLessonNotesData.success) {
                closeProcessingResitNoteConfirmNotification();
                openSuccessResitNoteConfirmNotification();
            } else {
                closeProcessingResitNoteConfirmNotification();
                openFailResitNoteConfirmNotification();
            }
            closeProcessingResitNoteConfirmNotification();
        } else {
            closeProcessingResitNoteConfirmNotification();
            openFailResitNoteConfirmNotification();
        }
    }

    return (
        <div>
            <SISTitle/>
            <TeacherNavbar/>
            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        ÖĞRENCİ NOT LİSTESİ
                    </a>
                    {(
                        !isMidtermNoteFeatureToggleEnabled
                            ?
                            null
                            :
                            lessonMidtermNoteIds.length === 0
                                ?
                                null
                                :
                                <button
                                    onClick={updateStudentsMidtermNotes}
                                    className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                >
                                    VİZE NOTLARI KAYDET
                                </button>
                    )}
                    {(
                        !isMidtermNoteFeatureToggleEnabled
                            ?
                            null
                            :
                            lessonMidtermNoteIds.length === 0
                                ?
                                null
                                :
                                <button
                                    onClick={confirmStudentsMidtermNotes}
                                    className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-blue hover:bg-sis-darkblue"
                                >
                                    VİZE NOTLARI KESİNLEŞTİR
                                </button>
                    )}
                    {(
                        !isFinalNoteFeatureToggleEnabled
                            ?
                            null
                            :
                            lessonFinalNoteIds.length === 0
                                ?
                                null
                                :
                                <button
                                    onClick={updateStudentsFinalNotes}
                                    className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                >
                                    FİNAL NOTLARI KAYDET
                                </button>
                    )}
                    {(
                        !isFinalNoteFeatureToggleEnabled
                            ?
                            null
                            :
                            lessonFinalNoteIds.length === 0
                                ?
                                null
                                :
                                <button
                                    onClick={confirmStudentsFinalNotes}
                                    className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-blue hover:bg-sis-darkblue"
                                >
                                    FİNAL NOTLARI KESİNLEŞTİR
                                </button>
                    )}
                    {(
                        !isResitNoteFeatureToggleEnabled
                            ?
                            null
                            :
                            lessonResitNoteIds.length === 0
                                ?
                                null
                                :
                                <button
                                    onClick={updateStudentsResitNotes}
                                    className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                                >
                                    BÜTÜNLEME NOTLARI KAYDET
                                </button>
                    )}
                    {(
                        !isResitNoteFeatureToggleEnabled
                            ?
                            null
                            :
                            lessonResitNoteIds.length === 0
                                ?
                                null
                                :
                                <button
                                    onClick={confirmStudentsResitNotes}
                                    className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-blue hover:bg-sis-darkblue"
                                >
                                    BÜTÜNLEME NOTLARI KESİNLEŞTİR
                                </button>
                    )}
                </div>
                {(
                    studentsLessonNotes.length !== 0
                        ?
                        <div className="flex flex-col">
                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                        <table className="bg-gray-50 min-w-full divide-y divide-gray-200">
                                            <thead className="font-phenomenaBold text-xl text-gray-500 text-left">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    ÖĞRENCİ
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    VİZE
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    FİNAL
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    BÜTÜNLEME
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    ORTALAMA
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    DURUMU
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                            {studentsLessonNotes.map((studentLessonNotes) => (
                                                <tr key={studentLessonNotes.id}>
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{studentLessonNotes.studentResponse.name} {studentLessonNotes.studentResponse.surname}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{studentLessonNotes.studentResponse.studentId}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <input
                                                            type="number"
                                                            max={100}
                                                            min={0}
                                                            name="midterm-note"
                                                            id="midterm-note"
                                                            defaultValue={studentLessonNotes.midtermNote}
                                                            onChange={(e) => {
                                                                if (e.target.value >= 100) {
                                                                    e.target.value = "100"
                                                                }
                                                                if (e.target.value <= 0) {
                                                                    e.target.value = "0"
                                                                }
                                                                setMidtermNoteToMap(studentLessonNotes.id, e.target.value)
                                                            }}
                                                            disabled={!isMidtermNoteFeatureToggleEnabled || studentLessonNotes.midtermNoteState === LessonNoteState.CONFIRMED}
                                                            className={isMidtermNoteFeatureToggleEnabled && studentLessonNotes.midtermNoteState !== LessonNoteState.CONFIRMED
                                                                ? "text-center w-20 font-phenomenaRegular text-sis-yellow focus:ring-sis-yellow focus:border-sis-yellow shadow-sm sm:text-xl border-sis-yellow rounded-md"
                                                                : "text-center w-20 font-phenomenaRegular text-gray-400 focus:ring-sis-yellow focus:border-sis-yellow shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                            }
                                                        />
                                                    </td>
                                                    {(
                                                        studentLessonNotes.midtermNoteState === LessonNoteState.CONFIRMED
                                                            ?
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <input
                                                                    type="number"
                                                                    max={100}
                                                                    min={0}
                                                                    required
                                                                    name="final-note"
                                                                    id="final-note"
                                                                    defaultValue={studentLessonNotes.finalNote}
                                                                    onChange={(e) => {
                                                                        if (e.target.value >= 100) {
                                                                            e.target.value = "100"
                                                                        }
                                                                        if (e.target.value <= 0) {
                                                                            e.target.value = "0"
                                                                        }
                                                                        setFinalNoteToMap(studentLessonNotes.id, e.target.value)
                                                                    }}
                                                                    disabled={!isFinalNoteFeatureToggleEnabled || studentLessonNotes.finalNoteState === LessonNoteState.CONFIRMED}
                                                                    className={isFinalNoteFeatureToggleEnabled && studentLessonNotes.finalNoteState !== LessonNoteState.CONFIRMED
                                                                        ? "text-center w-20 font-phenomenaRegular text-sis-yellow focus:ring-sis-yellow focus:border-sis-yellow shadow-sm sm:text-xl border-sis-yellow rounded-md"
                                                                        : "text-center w-20 font-phenomenaRegular text-gray-400 focus:ring-sis-yellow focus:border-sis-yellow shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                                    }
                                                                />
                                                            </td>
                                                            :
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                            </td>

                                                    )}
                                                    {(
                                                        (
                                                            studentLessonNotes.finalNoteState !== LessonNoteState.CONFIRMED
                                                            &&
                                                            studentLessonNotes.resitNoteState === LessonNoteState.NOT_ENTERED
                                                        )
                                                        ||
                                                        (
                                                            studentLessonNotes.resitNoteState === LessonNoteState.NOT_ENTERED
                                                            &&
                                                            studentLessonNotes.status === LessonNoteStatus.PASSED
                                                        )
                                                            ?
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                            </td>
                                                            :
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                <input
                                                                    type="number"
                                                                    max={100}
                                                                    min={0}
                                                                    name="resit-note"
                                                                    id="resit-note"
                                                                    defaultValue={studentLessonNotes.resitNote}
                                                                    onChange={(e) => {
                                                                        if (e.target.value >= 100) {
                                                                            e.target.value = "100"
                                                                        }
                                                                        if (e.target.value <= 0) {
                                                                            e.target.value = "0"
                                                                        }
                                                                        setResitNoteToMap(studentLessonNotes.id, e.target.value)
                                                                    }}
                                                                    disabled={!isResitNoteFeatureToggleEnabled || studentLessonNotes.resitNoteState === LessonNoteState.CONFIRMED}
                                                                    className={isResitNoteFeatureToggleEnabled && studentLessonNotes.resitNoteState !== LessonNoteState.CONFIRMED
                                                                        ? "text-center w-20 font-phenomenaRegular text-sis-yellow focus:ring-sis-yellow focus:border-sis-yellow shadow-sm sm:text-xl border-sis-yellow rounded-md"
                                                                        : "text-center w-20 font-phenomenaRegular text-gray-400 focus:ring-sis-yellow focus:border-sis-yellow shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                                    }
                                                                />
                                                            </td>
                                                    )}
                                                    <td className="px-2 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div
                                                                    className="font-phenomenaBold text-2xl text-sis-darkblue">{studentLessonNotes.meanOfNote}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span>
                                                            {LessonNoteStatus.getAll.map((lNoteStatus) => (
                                                                studentLessonNotes.status === lNoteStatus.enum
                                                                    ?
                                                                    lNoteStatus.miniComponent
                                                                    :
                                                                    null
                                                            ))}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>

                                            {/**
                                             * Midterm Note Update Notifications
                                             */}
                                            <ProcessNotification
                                                isOpen={isOpenProcessingMidtermNoteUpdateNotification}
                                                closeNotification={closeProcessingMidtermNoteUpdateNotification}
                                                title="Vize Notları Kaydediliyor..."
                                            />

                                            <SuccessNotification
                                                isOpen={isOpenSuccessMidtermNoteUpdateNotification}
                                                closeNotification={closeSuccessMidtermNoteUpdateNotification}
                                                title="Vize Notları Kaydedildi!"
                                                description="Öğrencilere ait Vize Notları başarıyla kaydedildi."
                                            />

                                            <FailNotification
                                                isOpen={isOpenFailMidtermNoteUpdateNotification}
                                                closeNotification={closeFailMidtermNoteUpdateNotification}
                                                title="Vize Notları Kaydedilemedi!"
                                                description="Tüm Öğrenciler için 0 ile 100 arasında olacak şekilde
                                                Vize Notu girişi yapmanız gerekmektedir. Tüm Notları doğru girdiyseniz;
                                                herhangi bir not değişikliği yapmadığınızdan veya
                                                sistemsel bir hatadan dolayı kaydedilmemiş olabilir."
                                            />

                                            {/**
                                             * Midterm Note Confirm Notifications
                                             */}
                                            <ProcessNotification
                                                isOpen={isOpenProcessingMidtermNoteConfirmNotification}
                                                closeNotification={closeProcessingMidtermNoteConfirmNotification}
                                                title="Vize Notları Kesinleştiriliyor..."
                                            />

                                            <SuccessNotification
                                                isOpen={isOpenSuccessMidtermNoteConfirmNotification}
                                                closeNotification={closeSuccessMidtermNoteConfirmNotification}
                                                title="Vize Notları Kesinleştirildi!"
                                                description="Öğrencilere ait Vize Notları başarıyla kesinleştirildi.
                                                Notlar kesinleştirildiği için herhangi bir not değişikliği yapamazsınız."
                                            />

                                            <FailNotification
                                                isOpen={isOpenFailMidtermNoteConfirmNotification}
                                                closeNotification={closeFailMidtermNoteConfirmNotification}
                                                title="Vize Notları Kesinleştirilemedi!"
                                                description="Tüm öğrenciler için Vize Notu Girişi yapmanız gerekmektedir.
                                                Tüm öğrenciler için Not Girişlerini yaptıysanız,
                                                sistemsel bir hatadan dolayı kesinleştirilememiş olabilir."
                                            />


                                            {/**
                                             * Final Note Update Notifications
                                             */}
                                            <ProcessNotification
                                                isOpen={isOpenProcessingFinalNoteUpdateNotification}
                                                closeNotification={closeProcessingFinalNoteUpdateNotification}
                                                title="Final Notları Kaydediliyor..."
                                            />

                                            <SuccessNotification
                                                isOpen={isOpenSuccessFinalNoteUpdateNotification}
                                                closeNotification={closeSuccessFinalNoteUpdateNotification}
                                                title="Final Notları Kaydedildi!"
                                                description="Öğrencilere ait Final Notları başarıyla kaydedildi."
                                            />

                                            <FailNotification
                                                isOpen={isOpenFailFinalNoteUpdateNotification}
                                                closeNotification={closeFailFinalNoteUpdateNotification}
                                                title="Final Notları Kaydedilemedi!"
                                                description="Tüm Öğrenciler için 0 ile 100 arasında olacak şekilde
                                                Final Notu girişi yapmanız gerekmektedir. Tüm Notları doğru girdiyseniz;
                                                herhangi bir not değişikliği yapmadığınızdan veya
                                                sistemsel bir hatadan dolayı kaydedilmemiş olabilir."
                                            />

                                            {/**
                                             * Final Note Confirm Notifications
                                             */}
                                            <ProcessNotification
                                                isOpen={isOpenProcessingFinalNoteConfirmNotification}
                                                closeNotification={closeProcessingFinalNoteConfirmNotification}
                                                title="Final Notları Kesinleştiriliyor..."
                                            />

                                            <SuccessNotification
                                                isOpen={isOpenSuccessFinalNoteConfirmNotification}
                                                closeNotification={closeSuccessFinalNoteConfirmNotification}
                                                title="Final Notları Kesinleştirildi!"
                                                description="Öğrencilere ait Final Notları başarıyla kesinleştirildi.
                                                Notlar kesinleştirildiği için herhangi bir not değişikliği yapamazsınız."
                                            />

                                            <FailNotification
                                                isOpen={isOpenFailFinalNoteConfirmNotification}
                                                closeNotification={closeFailFinalNoteConfirmNotification}
                                                title="Final Notları Kesinleştirilemedi!"
                                                description="Tüm öğrenciler için Final Notu Girişi yapmanız gerekmektedir.
                                                Tüm öğrenciler için Not Girişlerini yaptıysanız,
                                                sistemsel bir hatadan dolayı kesinleştirilememiş olabilir."
                                            />


                                            {/**
                                             * Resit Note Update Notifications
                                             */}
                                            <ProcessNotification
                                                isOpen={isOpenProcessingResitNoteUpdateNotification}
                                                closeNotification={closeProcessingResitNoteUpdateNotification}
                                                title="Bütünleme Notları Kaydediliyor..."
                                            />

                                            <SuccessNotification
                                                isOpen={isOpenSuccessResitNoteUpdateNotification}
                                                closeNotification={closeSuccessResitNoteUpdateNotification}
                                                title="Bütünleme Notları Kaydedildi!"
                                                description="Öğrencilere ait Bütünleme Notları başarıyla kaydedildi."
                                            />

                                            <FailNotification
                                                isOpen={isOpenFailResitNoteUpdateNotification}
                                                closeNotification={closeFailResitNoteUpdateNotification}
                                                title="Bütünleme Notları Kaydedilemedi!"
                                                description="Tüm Öğrenciler için 0 ile 100 arasında olacak şekilde
                                                Bütünleme Notu girişi yapmanız gerekmektedir. Tüm Notları doğru girdiyseniz;
                                                herhangi bir not değişikliği yapmadığınızdan veya
                                                sistemsel bir hatadan dolayı kaydedilmemiş olabilir."
                                            />

                                            {/**
                                             * Resit Note Confirm Notifications
                                             */}
                                            <ProcessNotification
                                                isOpen={isOpenProcessingResitNoteConfirmNotification}
                                                closeNotification={closeProcessingResitNoteConfirmNotification}
                                                title="Bütünleme Notları Kesinleştiriliyor..."
                                            />

                                            <SuccessNotification
                                                isOpen={isOpenSuccessResitNoteConfirmNotification}
                                                closeNotification={closeSuccessResitNoteConfirmNotification}
                                                title="Bütünleme Notları Kesinleştirildi!"
                                                description="Öğrencilere ait Bütünleme Notları başarıyla kesinleştirildi.
                                                Notlar kesinleştirildiği için herhangi bir not değişikliği yapamazsınız."
                                            />

                                            <FailNotification
                                                isOpen={isOpenFailResitNoteConfirmNotification}
                                                closeNotification={closeFailResitNoteConfirmNotification}
                                                title="Bütünleme Notları Kesinleştirilemedi!"
                                                description="Tüm öğrenciler için Bütünleme Notu Girişi yapmanız gerekmektedir.
                                                Tüm öğrenciler için Not Girişlerini yaptıysanız,
                                                sistemsel bir hatadan dolayı kesinleştirilememiş olabilir."
                                            />
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                )}
            </div>
        </div>
    )
}
