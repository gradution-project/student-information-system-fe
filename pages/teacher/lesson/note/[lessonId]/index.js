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
        router.reload();
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
     * STUDENT FINAL NOTE UPDATE OPERATION
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
            console.log(resitNoteIdsAndNotes)
        }
    }

    const updateStudentsResitNotes = async () => {
        openProcessingResitNoteUpdateNotification();

        const studentLessonNotesData = await StudentLessonNoteController
            .updateStudentsLessonResitNotes(operationUserId, Object.fromEntries(resitNoteIdsAndNotes));

        if (studentLessonNotesData.success) {
            closeProcessingResitNoteUpdateNotification();
            openSuccessResitNoteUpdateNotification();
        } else {
            closeProcessingResitNoteUpdateNotification();
            openFailResitNoteUpdateNotification();
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
                            <button
                                onClick={updateStudentsMidtermNotes}
                                className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                            >
                                NOTLARI KAYDET
                            </button>
                    )}
                    {(
                        !isFinalNoteFeatureToggleEnabled
                            ?
                            null
                            :
                            <button
                                onClick={updateStudentsFinalNotes}
                                className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                            >
                                NOTLARI KAYDET
                            </button>
                    )}
                    {(
                        !isResitNoteFeatureToggleEnabled
                            ?
                            null
                            :
                            <button
                                onClick={updateStudentsResitNotes}
                                className="font-phenomenaBold float-right ml-2 py-2 px-4 shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-sis-darkblue"
                            >
                                NOTLARI KAYDET
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
                                                    STATÜSÜ
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
                                                            disabled={!isMidtermNoteFeatureToggleEnabled}
                                                            className={isMidtermNoteFeatureToggleEnabled
                                                                ? "text-center w-20 font-phenomenaRegular text-sis-yellow focus:ring-sis-yellow focus:border-sis-yellow shadow-sm sm:text-xl border-sis-yellow rounded-md"
                                                                : "text-center w-20 font-phenomenaRegular text-gray-400 focus:ring-sis-yellow focus:border-sis-yellow shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                            }
                                                        />
                                                    </td>
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
                                                            disabled={!isFinalNoteFeatureToggleEnabled}
                                                            className={isFinalNoteFeatureToggleEnabled
                                                                ? "text-center w-20 font-phenomenaRegular text-sis-yellow focus:ring-sis-yellow focus:border-sis-yellow shadow-sm sm:text-xl border-sis-yellow rounded-md"
                                                                : "text-center w-20 font-phenomenaRegular text-gray-400 focus:ring-sis-yellow focus:border-sis-yellow shadow-sm sm:text-xl border-gray-300 rounded-md"
                                                            }
                                                        />
                                                    </td>
                                                    {(
                                                        studentLessonNotes.status === LessonNoteStatus.PASSED
                                                        &&
                                                        studentLessonNotes.resitNote === null
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
                                                                    disabled={!isResitNoteFeatureToggleEnabled}
                                                                    className={isResitNoteFeatureToggleEnabled
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
                                                Vize Notu girişi yapmanız gerekmektedir, notları doğru girdiyseniz
                                                sistemsel bir hatadan dolayı kaydedilmemiş olabilir."
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
                                                Final Notu girişi yapmanız gerekmektedir, notları doğru girdiyseniz
                                                sistemsel bir hatadan dolayı kaydedilmemiş olabilir."
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
                                                Bütünleme Notu girişi yapmanız gerekmektedir, notları doğru girdiyseniz
                                                sistemsel bir hatadan dolayı kaydedilmemiş olabilir."
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
