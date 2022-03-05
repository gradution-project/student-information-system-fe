import {useRouter} from "next/router";
import SISTitle from "../../../../public/components/page-titles";
import OfficerNavbar from "../../../../public/components/navbar/officer/officer-navbar";
import {lessonCompulsory, lessonSemesters, lessonStatuses} from "../../../../public/constants/lesson";
import {getOfficerNumberWithContext} from "../../../../public/storage/officer";
import UnauthorizedAccessPage from "../../../401";


export async function getServerSideProps(context) {
    const officerId = getOfficerNumberWithContext(context)
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const SIS_API_URL = process.env.SIS_API_URL;
    const lessonResponse = await fetch(`${SIS_API_URL}/lesson?status=ALL`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const lessonsData = await lessonResponse.json();
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

    const pushSavePage = async (event) => {
        event.preventDefault();
        await router.push('/officer/operation/lesson/save');
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="select-none px-28 py-5 mx-auto space-y-6">
                <div className="px-12 py-10 text-left bg-gray-50 rounded-2xl shadow-xl">
                    <a className="select-none font-phenomenaExtraBold text-left text-4xl text-sis-darkblue">
                        DERS LİSTESİ
                    </a>
                    <button
                        type="submit"
                        onClick={pushSavePage}
                        className="font-phenomenaBold float-right mr-2 py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                    >
                        DERS EKLE
                    </button>
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
                                    {
                                    }
                                    {lessons.map((lesson) => (
                                        <tr key={lesson.lessonId}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="ml-0.5">
                                                        <div
                                                            className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.name}</div>
                                                        <div
                                                            className="font-phenomenaRegular text-lg text-gray-500">{lesson.lessonId}</div>
                                                        {lessonSemesters.map((lSemester) => (
                                                            lesson.semester === lSemester.enum
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
                                                <div className="font-phenomenaBold text-xl text-sis-darkblue">{lesson.departmentResponse.facultyResponse.name}</div>
                                                <div className="font-phenomenaRegular text-xl text-sis-darkblue">{lesson.departmentResponse.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {lessonCompulsory.map((lCompulsory) => (
                                                    lesson.compulsoryOrElective === lCompulsory.enum
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
                                                             lesson.status === lStatus.enum
                                                                 ?
                                                                 lStatus.miniComponent
                                                                 :
                                                                 null
                                                         ))}
                                                </span>
                                            </td>
                                            <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                <a href={'/officer/operation/lesson/information/detail/' + lesson.lessonId}
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
                    {/*        <Transition appear show={isOpenFail} as={Fragment}>*/}
                    {/*            <Dialog*/}
                    {/*                as="div"*/}
                    {/*                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"*/}
                    {/*                onClose={closeFailModal}*/}
                    {/*            >*/}
                    {/*                <div className="min-h-screen px-4 text-center">*/}
                    {/*                    <Transition.Child*/}
                    {/*                        as={Fragment}*/}
                    {/*                        enter="ease-out duration-300"*/}
                    {/*                        enterFrom="opacity-0"*/}
                    {/*                        enterTo="opacity-100"*/}
                    {/*                        leave="ease-in duration-200"*/}
                    {/*                        leaveFrom="opacity-100"*/}
                    {/*                        leaveTo="opacity-0"*/}
                    {/*                    >*/}
                    {/*                        <Dialog.Overlay className="fixed inset-0"/>*/}
                    {/*                    </Transition.Child>*/}

                    {/*                    /!* This element is to trick the browser into centering the modal contents. *!/*/}
                    {/*                    <span*/}
                    {/*                        className="inline-block h-screen align-middle"*/}
                    {/*                        aria-hidden="true"*/}
                    {/*                    >*/}
                    {/*  &#8203;*/}
                    {/*</span>*/}
                    {/*                    <Transition.Child*/}
                    {/*                        as={Fragment}*/}
                    {/*                        enter="ease-out duration-300"*/}
                    {/*                        enterFrom="opacity-0 scale-95"*/}
                    {/*                        enterTo="opacity-100 scale-100"*/}
                    {/*                        leave="ease-in duration-200"*/}
                    {/*                        leaveFrom="opacity-100 scale-100"*/}
                    {/*                        leaveTo="opacity-0 scale-95"*/}
                    {/*                    >*/}
                    {/*                        <div*/}
                    {/*                            className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">*/}
                    {/*                            <Dialog.Title*/}
                    {/*                                as="h3"*/}
                    {/*                                className="text-3xl mb-4 font-medium leading-9 text-sis-white text-center font-phenomenaBold"*/}
                    {/*                            >*/}
                    {/*                                <div className="border bg-sis-fail rounded-xl p-6">*/}
                    {/*                                    Öğretmene Ait Ders Listesi Bulunamadı!*/}
                    {/*                                </div>*/}
                    {/*                            </Dialog.Title>*/}
                    {/*                            <div className="mt-2">*/}
                    {/*                                <p className="text-xl text-gray-400 text-center font-phenomenaRegular">*/}
                    {/*                                    Öğretmen Numarasını girmiş olduğunuz Öğretemen'e ait ders listesine ulaşılamadı.*/}
                    {/*                                    Öğretmen'e ders atayabilir veya başka bir Öğretmen'e ait dersleri listeyebilirsiniz.*/}
                    {/*                                </p>*/}
                    {/*                            </div>*/}
                    {/*                        </div>*/}
                    {/*                    </Transition.Child>*/}
                    {/*                </div>*/}
                    {/*            </Dialog>*/}
                    {/*        </Transition>*/}

                    {/*        <Transition appear show={isOpenProcessing} as={Fragment}>*/}
                    {/*            <Dialog*/}
                    {/*                as="div"*/}
                    {/*                className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"*/}
                    {/*                onClose={closeProcessingModal}*/}
                    {/*            >*/}
                    {/*                <div className="min-h-screen px-4 text-center">*/}
                    {/*                    <Transition.Child*/}
                    {/*                        as={Fragment}*/}
                    {/*                        enter="ease-out duration-300"*/}
                    {/*                        enterFrom="opacity-0"*/}
                    {/*                        enterTo="opacity-100"*/}
                    {/*                        leave="ease-in duration-200"*/}
                    {/*                        leaveFrom="opacity-100"*/}
                    {/*                        leaveTo="opacity-0"*/}
                    {/*                    >*/}
                    {/*                        <Dialog.Overlay className="fixed inset-0"/>*/}
                    {/*                    </Transition.Child>*/}

                    {/*                    /!* This element is to trick the browser into centering the modal contents. *!/*/}
                    {/*                    <span*/}
                    {/*                        className="inline-block h-screen align-middle"*/}
                    {/*                        aria-hidden="true"*/}
                    {/*                    >*/}
                    {/*  &#8203;*/}
                    {/*</span>*/}
                    {/*                    <Transition.Child*/}
                    {/*                        as={Fragment}*/}
                    {/*                        enter="ease-out duration-300"*/}
                    {/*                        enterFrom="opacity-0 scale-95"*/}
                    {/*                        enterTo="opacity-100 scale-100"*/}
                    {/*                        leave="ease-in duration-200"*/}
                    {/*                        leaveFrom="opacity-100 scale-100"*/}
                    {/*                        leaveTo="opacity-0 scale-95"*/}
                    {/*                    >*/}
                    {/*                        <div*/}
                    {/*                            className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">*/}
                    {/*                            <Dialog.Title*/}
                    {/*                                as="h3"*/}
                    {/*                                className="text-3xl font-medium leading-9 text-sis-yellow text-center font-phenomenaBold"*/}
                    {/*                            >*/}
                    {/*                                Dersler Listeleniyor...*/}
                    {/*                            </Dialog.Title>*/}
                    {/*                        </div>*/}
                    {/*                    </Transition.Child>*/}
                    {/*                </div>*/}
                    {/*            </Dialog>*/}
                    {/*        </Transition>*/}
                </div>
            </div>
        </div>

    )
}
