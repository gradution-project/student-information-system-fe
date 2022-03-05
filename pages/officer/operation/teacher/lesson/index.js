import {useRouter} from "next/router";
import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {lessonCompulsory, lessonSemesters, lessonStatuses} from "../../../../../public/constants/lesson";
import {Fragment, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";

export async function getServerSideProps() {
    const SIS_API_URL = process.env.SIS_API_URL;
    const lessonsResponse = await fetch(`${SIS_API_URL}/teacher/lesson`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const lessonsData = await lessonsResponse.json();
    if (lessonsData.success) {
        return {
            props: {
                lessons: lessonsData.response,
                SIS_API_URL: SIS_API_URL
            }
        }
    }
}

export default function TeacherLessonList({lessons, SIS_API_URL}) {

    const router = useRouter();

    const pushAssigmentPage = async (event) => {
        event.preventDefault();
        await router.push('/officer/operation/teacher/lesson/assignment');
    }

    let [isOpenSuccessDelete, setIsOpenSuccessDelete] = useState(false);

    function closeSuccessModalDelete() {
        setIsOpenSuccessDelete(false);
        router.reload();
    }

    function openSuccessModalDelete() {
        setIsOpenSuccessDelete(true);
    }

    let [isOpenFailDelete, setIsOpenFailDelete] = useState(false);

    function closeFailModalDelete() {
        setIsOpenFailDelete(false);
    }

    function openFailModalDelete() {
        setIsOpenFailDelete(true);
    }

    let [isOpenProcessingDelete, setIsOpenProcessingDelete] = useState(false);

    function closeProcessingModalDelete() {
        setIsOpenProcessingDelete(false);
    }

    function openProcessingModalDelete() {
        setIsOpenProcessingDelete(true);
    }


    const lessonDelete = async (event) => {
        openProcessingModalDelete();

        event.preventDefault()
        const deleteRes = await fetch(`${SIS_API_URL}/teacher/lesson/delete`, {
            headers: {'Content-Type': 'application/json'},
            method: 'DELETE',
            body: JSON.stringify({
                teacherLessonInfoRequest: {
                    lessonId: 0,
                    teacherId: 0
                }
            }),
        });
        const deleteData = await deleteRes.json();
        if (deleteData.success) {
            closeProcessingModalDelete();
            openSuccessModalDelete()
        } else {
            closeProcessingModalDelete();
            openFailModalDelete();
        }
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
                                    {lessons.map((lesson) => (
                                        <tr key={lesson.lessonResponse.lessonId}>
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
                                                        {lessonSemesters.map((lSemester) => (
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
                                        {/*       <td className="ml-10 px-6 py-4 text-right font-phenomenaBold text-xl">
                                                   <a onClick={lessonDelete}
                                                      className='text-sis-fail'>
                                                       SİL
                                                   </a>
                                               </td> */}
                                        </tr>
                                    ))}
                                    </tbody>
                                            <Transition appear show={isOpenSuccessDelete} as={Fragment}>
                                                <Dialog
                                                    as="div"
                                                    className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                    onClose={closeSuccessModalDelete}
                                                >
                                                    <div className="min-h-screen px-4 text-center">
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-300"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="ease-in duration-200"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Dialog.Overlay className="fixed inset-0"/>
                                                        </Transition.Child>

                                                        <span
                                                            className="inline-block h-screen align-middle"
                                                            aria-hidden="true"
                                                        >
              &#8203;
            </span>
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-300"
                                                            enterFrom="opacity-0 scale-95"
                                                            enterTo="opacity-100 scale-100"
                                                            leave="ease-in duration-200"
                                                            leaveFrom="opacity-100 scale-100"
                                                            leaveTo="opacity-0 scale-95"
                                                        >
                                                            <div
                                                                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                                                <Dialog.Title
                                                                    as="h3"
                                                                    className="text-3xl mb-4 font-medium leading-9 text-sis-white text-center font-phenomenaBold"
                                                                >
                                                                    <div className="border bg-sis-success rounded-xl p-6">
                                                                        Atanan Ders Silme İşlemi Başarılı!
                                                                    </div>
                                                                </Dialog.Title>
                                                                <div className="mt-2">
                                                                    <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                        Atanan Ders Silme İşlemi başarıyla gerçekleşti.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Transition.Child>
                                                    </div>
                                                </Dialog>
                                            </Transition>
                                            <Transition appear show={isOpenFailDelete} as={Fragment}>
                                                <Dialog
                                                    as="div"
                                                    className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                    onClose={closeFailModalDelete}
                                                >
                                                    <div className="min-h-screen px-4 text-center">
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-300"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="ease-in duration-200"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Dialog.Overlay className="fixed inset-0"/>
                                                        </Transition.Child>

                                                        <span
                                                            className="inline-block h-screen align-middle"
                                                            aria-hidden="true"
                                                        >
              &#8203;
            </span>
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-300"
                                                            enterFrom="opacity-0 scale-95"
                                                            enterTo="opacity-100 scale-100"
                                                            leave="ease-in duration-200"
                                                            leaveFrom="opacity-100 scale-100"
                                                            leaveTo="opacity-0 scale-95"
                                                        >
                                                            <div
                                                                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                                                <Dialog.Title
                                                                    as="h3"
                                                                    className="text-3xl mb-4 font-medium leading-9 text-sis-white text-center font-phenomenaBold"
                                                                >
                                                                    <div className="border bg-sis-fail rounded-xl p-6">
                                                                        Atanan Ders Silme İşlemi Başarısız!
                                                                    </div>
                                                                </Dialog.Title>
                                                                <div className="mt-2">
                                                                    <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                                        Lütfen girdiğiniz verileri kontrol ediniz.
                                                                        Verilerinizi doğru girdiyseniz sistemsel bir
                                                                        hatadan dolayı isteğiniz sonuçlandıralamamış olabilir.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </Transition.Child>
                                                    </div>
                                                </Dialog>
                                            </Transition>

                                            <Transition appear show={isOpenProcessingDelete} as={Fragment}>
                                                <Dialog
                                                    as="div"
                                                    className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                                    onClose={closeProcessingModalDelete}
                                                >
                                                    <div className="min-h-screen px-4 text-center">
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-300"
                                                            enterFrom="opacity-0"
                                                            enterTo="opacity-100"
                                                            leave="ease-in duration-200"
                                                            leaveFrom="opacity-100"
                                                            leaveTo="opacity-0"
                                                        >
                                                            <Dialog.Overlay className="fixed inset-0"/>
                                                        </Transition.Child>

                                                        <span
                                                            className="inline-block h-screen align-middle"
                                                            aria-hidden="true"
                                                        >
              &#8203;
            </span>
                                                        <Transition.Child
                                                            as={Fragment}
                                                            enter="ease-out duration-300"
                                                            enterFrom="opacity-0 scale-95"
                                                            enterTo="opacity-100 scale-100"
                                                            leave="ease-in duration-200"
                                                            leaveFrom="opacity-100 scale-100"
                                                            leaveTo="opacity-0 scale-95"
                                                        >
                                                            <div
                                                                className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                                                <Dialog.Title
                                                                    as="h3"
                                                                    className="text-3xl font-medium leading-9 text-sis-yellow text-center font-phenomenaBold"
                                                                >
                                                                    Atanan Ders Silme İsteğiniz İşleniyor...
                                                                </Dialog.Title>
                                                            </div>
                                                        </Transition.Child>
                                                    </div>
                                                </Dialog>
                                            </Transition>
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
