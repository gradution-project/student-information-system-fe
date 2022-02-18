import {useRouter} from "next/router";
import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {lessonCompulsory, lessonSemesters, lessonStatuses} from "../../../../../public/constants/lesson";


export async function getServerSideProps() {
    const SIS_API_URL = process.env.SIS_API_URL;
    const lessonResponse = await fetch(`${SIS_API_URL}/teacher/lesson`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const lessonsData = await lessonResponse.json();
    if (lessonsData.success) {
        return {
            props: {
                lessons: lessonsData.response,
            }
        }
    }
}

export default function TeacherLessonList({lessons}) {

    const router = useRouter();

    const pushAssigmentPage = async (event) => {
        event.preventDefault();
        await router.push('/officer/operation/teacher/lesson/assignment');
    }


    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className=" select-none px-28 py-5 mx-auto space-y-6">
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
                    lessons != null
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
                                                    DERSİN ADI
                                                </th>
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
                                                    AKADEMİK BİLGİLER
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="select-none px-6 py-3 tracking-wider"
                                                >
                                                    DERS ZORUNLULUĞU
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
                                    {lessons.map((lesson) => (
                                        <tr key={lesson.lessonResponse.lessonId}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-0.5">
                                                        <div
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.lessonResponse.name}</div>
                                                        <div
                                                            className="font-phenomenaRegular text-lg text-gray-500">{lesson.lessonResponse.lessonId}</div>
                                                        {lessonSemesters.map((lSemester) => (
                                                            lesson.lessonResponse.semester === lSemester.enum
                                                                ?
                                                                <div
                                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lSemester.tr}</div>
                                                                :
                                                                null
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-0.5">
                                                        <div
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.teacherInfoResponse.name} {lesson.teacherInfoResponse.surname}</div>
                                                        <div
                                                            className="font-phenomenaRegular text-lg text-gray-500">{lesson.teacherInfoResponse.teacherId}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.lessonResponse.departmentResponse.facultyResponse.name}</div>
                                                <div
                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.lessonResponse.departmentResponse.name}</div>

                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {lessonCompulsory.map((lCompulsory) => (
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
                                                         {lessonStatuses.map((lStatus) => (
                                                             lesson.lessonResponse.status === lStatus.enum
                                                                 ?
                                                                 lStatus.miniComponent
                                                                 :
                                                                 null
                                                         ))}
                                                </span>
                                            </td>
                                            <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                <a href={'/officer/operation/teacher/lesson/information/detail/' + lesson.teacherInfoResponse.teacherId}
                                                   className='text-sis-yellow'>
                                                    DETAY
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
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
