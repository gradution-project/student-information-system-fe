import SISTitle from "../../../public/components/page-titles";
import Cookies from 'universal-cookie';
import TeacherNavbar from "../../../public/components/navbar/teacher/teacher-navbar";

export const getStaticProps = async () => {
    const lessonResponse = await fetch("http://localhost:8585/lesson/teacher/", {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const lessonData = await lessonResponse.json();
    if (lessonData.success) {
        return {
            props: {lessons: lessonData.response}
        }
    }
}

export default function TeacherLessonList({lessons}) {

    const cookies = new Cookies();

    return (
        <div>
            <SISTitle/>
            <TeacherNavbar/>
            <div className="px-28 py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        DERSLERİM
                    </a>
                </div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="bg-gray-50 min-w-full divide-y divide-gray-200">
                                    <thead className="font-phenomenaBold text-xl text-gray-500 text-left">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="select-none px-10 py-3 tracking-wider"
                                        >
                                            DERS
                                        </th>
                                        <th
                                            scope="col"
                                            className="select-none px-16 py-3 tracking-wider"
                                        >
                                            KREDİ
                                        </th>
                                        <th
                                            scope="col"
                                            className="select-none px-16 py-3 tracking-wider"
                                        >
                                            ZORUNLU/SEÇMELİ
                                        </th>
                                        <th
                                            scope="col"
                                            className="select-none px-16 py-3 tracking-wider"
                                        >
                                            BÖLÜM KODU
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {lessons.map((lesson) => (
                                        lesson.teacherId == cookies.get('teacherNumber')
                                            ?
                                            <tr key={lesson.lessonId}>
                                                <td className="px-10 py-4 whitespace-nowrap">
                                                    <div
                                                        className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.name}</div>
                                                    <div
                                                        className="font-phenomenaRegular text-lg text-gray-600">{lesson.lessonId}</div>
                                                    <div
                                                        className="font-phenomenaLight text-lg text-gray-500">{lesson.semester}.
                                                        Yarıyıl
                                                    </div>
                                                </td>
                                                <td className="px-20 py-4 whitespace-nowrap">
                                                    <div
                                                        className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.credit}</div>
                                                </td>
                                                <td className="px-24 py-4 whitespace-nowrap">
                                                    <div
                                                        className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.compulsoryOrElective}</div>
                                                </td>
                                                <td className="px-24 py-4 whitespace-nowrap">
                                                    <div
                                                        className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.departmentId}</div>
                                                </td>
                                            </tr>
                                            : <tr>
                                            </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
