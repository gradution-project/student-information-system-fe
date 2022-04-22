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

    const [midtermNote, setMidtermNote] = useState();
    const changeMidtermNote = event => {
        setMidtermNote(event.target.value);
    }

    const updateStudentMidtermNote = async (id) => {
        openProcessingMidtermNoteUpdateNotification();

        const studentLessonNotesData = await StudentLessonNoteController.updateStudentLessonMidtermNote(operationUserId, id, midtermNote);
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
        router.reload();
    }

    function openFailFinalNoteUpdateNotification() {
        setIsOpenFailFinalNoteUpdateNotification(true);
    }

    const [finalNote, setFinalNote] = useState();
    const changeFinalNote = event => {
        setFinalNote(event.target.value);
    }

    const updateStudentFinalNote = async (id) => {
        openProcessingFinalNoteUpdateNotification();

        if (finalNote <= 100) {
            const studentLessonNotesData = await StudentLessonNoteController.updateStudentLessonFinalNote(operationUserId, id, finalNote);
            if (studentLessonNotesData.success) {
                closeProcessingFinalNoteUpdateNotification();
                openSuccessFinalNoteUpdateNotification();
            } else {
                closeProcessingFinalNoteUpdateNotification();
                openFailFinalNoteUpdateNotification();
            }
        } else {
            closeProcessingFinalNoteUpdateNotification();
            openFailFinalNoteUpdateNotification();
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
        router.reload();
    }

    function openFailResitNoteUpdateNotification() {
        setIsOpenFailResitNoteUpdateNotification(true);
    }

    const [resitNote, setResitNote] = useState();
    const changeResitNote = event => {
        setResitNote(event.target.value);
    }

    const updateStudentResitNote = async (id) => {
        openProcessingResitNoteUpdateNotification();

        const studentLessonNotesData = await StudentLessonNoteController.updateStudentLessonResitNote(operationUserId, id, resitNote);
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
                                                                changeMidtermNote(e)
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
                                                                changeFinalNote(e)
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
                                                                        changeResitNote(e)
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
                                                    {(
                                                        isMidtermNoteFeatureToggleEnabled
                                                            ?
                                                            <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                                <button
                                                                    onClick={() => updateStudentMidtermNote(studentLessonNotes.id)}
                                                                    className='text-sis-yellow'>
                                                                    GÜNCELLE
                                                                </button>
                                                            </td>
                                                            :
                                                            null
                                                    )}
                                                    {(
                                                        isFinalNoteFeatureToggleEnabled
                                                            ?
                                                            <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                                <button
                                                                    onClick={() => updateStudentFinalNote(studentLessonNotes.id)}
                                                                    className='text-sis-yellow'>
                                                                    GÜNCELLE
                                                                </button>
                                                            </td>
                                                            :
                                                            null
                                                    )}
                                                    {(
                                                        isResitNoteFeatureToggleEnabled
                                                            ?
                                                            <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                                <button
                                                                    onClick={() => updateStudentResitNote(studentLessonNotes.id)}
                                                                    className='text-sis-yellow'>
                                                                    GÜNCELLE
                                                                </button>
                                                            </td>
                                                            :
                                                            null
                                                    )}
                                                </tr>
                                            ))}
                                            </tbody>

                                            {/**
                                             * Midterm Note Update Notifications
                                             */}
                                            <ProcessNotification
                                                isOpen={isOpenProcessingMidtermNoteUpdateNotification}
                                                closeNotification={closeProcessingMidtermNoteUpdateNotification}
                                                title="Vize Notu Güncelleniyor..."
                                            />

                                            <SuccessNotification
                                                isOpen={isOpenSuccessMidtermNoteUpdateNotification}
                                                closeNotification={closeSuccessMidtermNoteUpdateNotification}
                                                title="Vize Notu Güncellendi!"
                                                description="Öğrencinin Vize Notu başarıyla güncellendi."
                                            />

                                            <FailNotification
                                                isOpen={isOpenFailMidtermNoteUpdateNotification}
                                                closeNotification={closeFailMidtermNoteUpdateNotification}
                                                title="Vize Notu Güncellenemedi!"
                                                description="Öğrencinin Bütünleme Notunu 0 ile 100 arasında giriniz,
                                                notu doğru girdiyseniz sistemsel bir hatadan dolayı güncellenmemiş olabilir."
                                            />


                                            {/**
                                             * Final Note Update Notifications
                                             */}
                                            <ProcessNotification
                                                isOpen={isOpenProcessingFinalNoteUpdateNotification}
                                                closeNotification={closeProcessingFinalNoteUpdateNotification}
                                                title="Final Notu Güncelleniyor..."
                                            />

                                            <SuccessNotification
                                                isOpen={isOpenSuccessFinalNoteUpdateNotification}
                                                closeNotification={closeSuccessFinalNoteUpdateNotification}
                                                title="Final Notu Güncellendi!"
                                                description="Öğrencinin Final Notu başarıyla güncellendi."
                                            />

                                            <FailNotification
                                                isOpen={isOpenFailFinalNoteUpdateNotification}
                                                closeNotification={closeFailFinalNoteUpdateNotification}
                                                title="Final Notu Güncellenemedi!"
                                                description="Öğrencinin Bütünleme Notunu 0 ile 100 arasında giriniz,
                                                notu doğru girdiyseniz sistemsel bir hatadan dolayı güncellenmemiş olabilir."
                                            />


                                            {/**
                                             * Resit Note Update Notifications
                                             */}
                                            <ProcessNotification
                                                isOpen={isOpenProcessingResitNoteUpdateNotification}
                                                closeNotification={closeProcessingResitNoteUpdateNotification}
                                                title="Bütünleme Notu Güncelleniyor..."
                                            />

                                            <SuccessNotification
                                                isOpen={isOpenSuccessResitNoteUpdateNotification}
                                                closeNotification={closeSuccessResitNoteUpdateNotification}
                                                title="Bütünleme Notu Güncellendi!"
                                                description="Öğrencinin Bütünleme Notu başarıyla güncellendi."
                                            />

                                            <FailNotification
                                                isOpen={isOpenFailResitNoteUpdateNotification}
                                                closeNotification={closeFailResitNoteUpdateNotification}
                                                title="Bütünleme Notu Güncellenemedi!"
                                                description="Öğrencinin Bütünleme Notunu 0 ile 100 arasında giriniz,
                                                notu doğru girdiyseniz sistemsel bir hatadan dolayı güncellenmemiş olabilir."
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
