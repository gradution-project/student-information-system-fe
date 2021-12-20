import {useRouter} from "next/router";
import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";

export const getStaticProps = async () => {
    const lessonResponse = await fetch("http://localhost:8585/lesson/teacher", {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const lessonsData = await lessonResponse.json();
    if (lessonsData.success) {
        return {
            props: {lessons: lessonsData.result}
        }
    }
}

export default function LessonList({lessons}) {
    const router = useRouter();

    const pushSavePage = async (event) => {
        event.preventDefault();
        await router.push('/officer/operation/teacher/lesson/save');
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="px-28 py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        ÖĞRETMEN DERS LİSTESİ
                    </a>
                    <button
                        type="submit"
                        onClick={pushSavePage}
                        className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                    >
                        DERS ATAMA
                    </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <div className="float-left py-1">
                        <button
                            id="search"
                            type="submit"
                            className="font-phenomenaBold float-right py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                        >
                            ARA
                        </button>
                    </div>
                    <input
                        placeholder="Aranacak kelimeyi giriniz..."
                        type="text"
                        name="textSearch"
                        id="textSearch"
                        className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table id="table" className="bg-gray-50 min-w-full divide-y divide-gray-200">
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
                                            BÖLÜM KODU
                                        </th>
                                        <th
                                            scope="col"
                                            className="select-none px-6 py-3 tracking-wider"
                                        >
                                            DERSİ ALAN HOCA
                                        </th>
                                        <th
                                            scope="col"
                                            className="select-none px-6 py-3 tracking-wider"
                                        >
                                            DERS DURUMU
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {lessons.map((lesson) => (
                                        <tr key={lesson.lessonId}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-0.5">
                                                        <div
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.name} </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.departmentId}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.teacherId}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div
                                                    className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.compulsoryOrElective}</div>
                                            </td>
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
