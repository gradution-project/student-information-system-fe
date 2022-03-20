import {useRouter} from "next/router";
import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import LessonSemester from "../../../../../public/constants/lesson/LessonSemester";
import {useState} from "react";
import SisOfficerStorage from "../../../../../public/storage/officer/SisOfficerStorage";
import UnauthorizedAccessPage from "../../../../401";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";
import TeacherLessonController from "../../../../../public/api/teacher/lesson/TeacherLessonController";
import LessonCompulsoryOrElective from "../../../../../public/constants/lesson/LessonCompulsoryOrElective";
import LessonStatus from "../../../../../public/constants/lesson/LessonStatus";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const lessonsData = await TeacherLessonController.getAllTeachersLessons();
    if (lessonsData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                lessons: lessonsData.response
            }
        }
    }
}

export default function TeacherLessonList({isPagePermissionSuccess, lessons}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    const pushAssigmentPage = async (event) => {
        event.preventDefault();
        await router.push('/officer/operation/teacher/lesson/assignment');
    }

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


    const deleteTeacherLesson = async (lessonId, teacherId) => {
        openProcessingDeleteNotification();

        const teacherLessonData = await TeacherLessonController.deleteTeacherLesson(lessonId, teacherId);
        if (teacherLessonData.success) {
            closeProcessingDeleteNotification();
            openSuccessDeleteNotification();
        } else {
            closeProcessingDeleteNotification();
            openFailDeleteNotification();
        }
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="max-w-7xl select-none py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        ATANAN DERS LİSTESİ
                    </a>
                    <button
                        type="submit"
                        onClick={pushAssigmentPage}
                        className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                    >
                        DERS ATAMA
                    </button>
                </div>
                {(
                    lessons.length !== 0
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
                                                    ÖĞRETMEN ADI
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    DERS
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    AKADEMİK BİLGİLER
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    DERS DURUMU
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
                                            {lessons.map((lesson, lessonResponse) => (
                                                <tr key={lessonResponse.lessonId}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-0.5">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.teacherInfoResponse.name} {lesson.teacherInfoResponse.surname}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{lesson.teacherInfoResponse.teacherId}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-0.5">
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.lessonResponse.name}</div>
                                                                <div
                                                                    className="select-all font-phenomenaRegular text-lg text-gray-500">{lesson.lessonResponse.lessonId}</div>
                                                                {LessonSemester.getAll.map((lSemester) => (
                                                                    lesson.lessonResponse.semester === lSemester.enum
                                                                        ?
                                                                        <div
                                                                            className="font-phenomenaBold text-xl text-gray-500">{lSemester.tr}</div>
                                                                        :
                                                                        null
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.lessonResponse.departmentResponse.facultyResponse.name}</div>
                                                        <div
                                                            className="font-phenomenaRegular text-xl text-sis-darkblue">{lesson.lessonResponse.departmentResponse.name}</div>

                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {LessonCompulsoryOrElective.getAll.map((lCompulsory) => (
                                                            lesson.lessonResponse.compulsoryOrElective === lCompulsory.enum
                                                                ?
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lCompulsory.tr}</div>
                                                                :
                                                                null
                                                        ))}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                <span>
                                                         {LessonStatus.getAll.map((lStatus) => (
                                                             lesson.lessonResponse.status === lStatus.enum
                                                                 ?
                                                                 lStatus.miniComponent
                                                                 :
                                                                 null
                                                         ))}
                                                </span>
                                                    </td>
                                                    <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                        <button
                                                            onClick={() => deleteTeacherLesson(lesson.lessonResponse.lessonId, lesson.teacherInfoResponse.teacherId)}
                                                            className='text-sis-fail'>
                                                            SİL
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>

                                            <ProcessNotification
                                                isOpen={isOpenProcessingDeleteNotification}
                                                closeNotification={closeProcessingDeleteNotification}
                                                title="Atanan Ders Kaydı Siliniyor..."
                                            />

                                            <SuccessNotification
                                                isOpen={isOpenSuccessDeleteNotification}
                                                closeNotification={closeSuccessDeleteNotification}
                                                title="Atanan Ders Kaydı Silindi!"
                                                description="Atanan Ders Kayıt Silme İşlemi başarıyla gerçekleşti."
                                            />

                                            <FailNotification
                                                isOpen={isOpenFailDeleteNotification}
                                                closeNotification={closeFailDeleteNotification}
                                                title="Atanan Ders Kaydı Silinemedi!"
                                                description="Sistemsel bir hatadan dolayı
                                                isteğiniz sonuçlandıralamamış olabilir."
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
