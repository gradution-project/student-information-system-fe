import {Fragment, useState} from "react";
import {useRouter} from "next/router";
import {Dialog, Transition} from "@headlessui/react";
import SISTitle from "../../../../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../../../../public/components/navbar/officer/officer-navbar";

export async function getServerSideProps({query}) {
    const {id} = query;
    const departmentResponses = await fetch("http://localhost:8585/department?status=ACTIVE", {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const lessonResponse = await fetch("http://localhost:8585/lesson/" + id, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });

    const departmentDatas = await departmentResponses.json();
    const lessonData = await lessonResponse.json();
    if (lessonData.success && departmentDatas.success) {
        console.log(departmentDatas.response)
        console.log(lessonData.response)
        return {
            props: {
                departments: departmentDatas.response,
                lesson: lessonData.response
            }
        }
    }
}

const lessonSemesters = [
    {
        value: 'FIRST',
        name: '1. Dönem'
    },
    {
        value: 'SECOND',
        name: '2. Dönem'
    },
    {
        value: 'THIRD',
        name: '3. Dönem'
    },
    {
        value: 'FOURTH',
        name: '4. Dönem'
    },
    {
        value: 'FIFTH',
        name: '5. Dönem'
    },
    {
        value: 'SIXTH',
        name: '6. Dönem'
    },
    {
        value: 'SEVENTH',
        name: '7. Dönem'
    },
    {
        value: 'EIGHTH',
        name: '8. Dönem'
    },
    {
        value: 'NINTH',
        name: '9. Dönem'
    },
    {
        value: 'TENTH',
        name: '10. Dönem'
    },
    {
        value: 'ELEVENTH',
        name: '11. Dönem'
    },
    {
        value: 'TWELFTH',
        name: '12. Dönem'
    },
]

const lessonCompulsory = [
    {
        value: 'COMPULSORY',
        name: 'Zorunlu'
    },
    {
        value: 'ELECTIVE',
        name: 'Seçmeli'
    }
]

export default function detailLesson({departments, lesson}) {

    const {departmentResponse, lessonId, name, credit, semester, compulsoryOrElective, status} = lesson;
    const departmentName = departmentResponse.name;

    const router = useRouter();

    const [lessonName, setLessonName] = useState();
    const changeLessonName = event => {
        const lessonName = event.target.value;
        setLessonName(lessonName);
    }

    const [lessonCredit, setLessonCredit] = useState();
    const changeLessonCredit = event => {
        const lessonCredit = event.target.value;
        setLessonCredit(lessonCredit);
    }

    const [lessonCorE, setLessonCorE] = useState();
    const changelessonCorE = event => {
        const lessonCorE = event.target.value;
        setLessonCorE(lessonCorE);
    }

    const [lessonSemester, setLessonSemester] = useState();
    const changeLessonSemester = event => {
        const lessonSemester = event.target.value;
        setLessonSemester(lessonSemester);
    }

    const [lessonDepartmentId, setLessonDepartmentId] = useState();
    const changeLessonDepartmentId = event => {
        const lessonDepartmentId = event.target.value;
        setLessonDepartmentId(lessonDepartmentId);
    }

    const [lessonStatus, setLessonStatus] = useState();
    const changeLessonStatus = event => {
        const lessonStatus = event.target.value;
        setLessonStatus(lessonStatus);
    }


    let [isOpenSuccess, setIsOpenSuccess] = useState(false);

    function closeSuccessModal() {
        setIsOpenSuccess(false);
        router.push("/officer/operation/teacher/lesson");
    }

    function openSuccessModal() {
        setIsOpenSuccess(true);
    }

    let [isOpenFail, setIsOpenFail] = useState(false);

    function closeFailModal() {
        setIsOpenFail(false);
    }

    function openFailModal() {
        setIsOpenFail(true);
    }

    let [isOpenProcessing, setIsOpenProcessing] = useState(false);

    function closeProcessingModal() {
        setIsOpenProcessing(false);
    }

    function openProcessingModal() {
        setIsOpenProcessing(true);
    }

    const lessonUpdate = async (event) => {
        openProcessingModal();

        event.preventDefault();

        const saveRes = await fetch("http://localhost:8585/lesson/save", {
            body: JSON.stringify({

                lessonInfoRequest: {
                    compulsoryOrElective: lessonCorE,
                    credit: lessonCredit,
                    departmentId: lessonDepartmentId,
                    name: lessonName,
                    semester: lessonSemester,
                    status: lessonStatus
                },
                operationInfoRequest: {
                    userId: 12004
                }
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });
        const saveData = await saveRes.json();
        if (saveData.success) {
            closeProcessingModal();
            openSuccessModal()
        } else {
            closeProcessingModal();
            openFailModal();
        }
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="mt-10 sm:mt-0">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="px-4 py-5 max-w-2xl mx-auto space-y-6">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="bg-white sm:p-6">
                                    <div className="px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="mb-8 py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-4xl">
                                            {name}
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="lessonId"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DERS NUMARASI
                                            </label>
                                            <input
                                                onChange={changeLessonName}
                                                type="text"
                                                name="id"
                                                id="id"
                                                defaultValue={lessonId}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DERS ADI
                                            </label>
                                            <input
                                                onChange={changeLessonName}
                                                type="text"
                                                name="name"
                                                id="name"
                                                defaultValue={name}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="credit"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                KREDİSİ
                                            </label>
                                            <input
                                                onChange={changeLessonCredit}
                                                type="text"
                                                name="credit"
                                                id="credit"
                                                defaultValue={credit}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>


                                        <div className="sm:col-span-3">
                                            <label htmlFor="semester"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                YARIYIL
                                            </label>
                                            <select
                                                onChange={changeLessonSemester}
                                                id="semester"
                                                name="semester"
                                                autoComplete="semester"
                                                defaultValue={semester}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                {lessonSemesters.map((semesters) => (
                                                    semester === semesters.name
                                                        ?
                                                        <option value={semesters.lessonId}
                                                                selected>{semesters.name}</option>
                                                        :
                                                        <option
                                                            value={semesters.lessonId}>{semesters.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="compulsory-or-elective"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DERS DURUMU
                                            </label>
                                            <select
                                                onChange={changelessonCorE}
                                                id="compulsory-or-elective"
                                                name="compulsory-or-elective"
                                                autoComplete="compulsory-or-elective"
                                                defaultValue={compulsoryOrElective}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                {lessonCompulsory.map((lessonCorE) => (
                                                    compulsoryOrElective === lessonCorE.name
                                                        ?
                                                        <option value={lessonCorE.lessonId}
                                                                selected>{lessonCorE.name}</option>
                                                        :
                                                        <option
                                                            value={lessonCorE.lessonId}>{lessonCorE.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="status"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                STATÜSÜ
                                            </label>
                                            <select
                                                onChange={changeLessonStatus}
                                                id="status"
                                                name="status"
                                                autoComplete="status"
                                                defaultValue={status}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                {lessonStatusType.map((lessonsStatus) => (
                                                    status === lessonsStatus.name
                                                        ?
                                                        <option value={lessonsStatus.lessonId}
                                                                selected>{lessonsStatus.name}</option>
                                                        :
                                                        <option
                                                            value={lessonsStatus.lessonId}>{lessonsStatus.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="sm:col-span-4">
                                            <label htmlFor="department"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                BÖLÜMÜ
                                            </label>
                                            <select
                                                onChange={changeLessonDepartmentId}
                                                id="department-id"
                                                name="department-id"
                                                autoComplete="department-id"
                                                defaultValue={departmentName}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                {departments.map((department) => (
                                                    departmentName === department.name
                                                        ?
                                                        <option value={department.departmentId}
                                                                selected>{department.name}</option>
                                                        :
                                                        <option
                                                            value={department.departmentId}>{department.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-green-600"
                                    >
                                        GÜNCELLE
                                    </button>
                                </div>
                                <Transition appear show={isOpenSuccess} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeSuccessModal}
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
                                                            Ders Ekleme İşlemi Başarılı!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Ders Ekleme İşlemi başarıyla gerçekleşti.
                                                            Mesaj penceresini kapattıktan sonra ders listeleme
                                                            ekranına yönlendirileceksiniz.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Transition.Child>
                                        </div>
                                    </Dialog>
                                </Transition>
                                <Transition appear show={isOpenFail} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeFailModal}
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
                                                            Ders Ekleme İşlemi Başarısız!
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

                                <Transition appear show={isOpenProcessing} as={Fragment}>
                                    <Dialog
                                        as="div"
                                        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-60"
                                        onClose={closeProcessingModal}
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
                                                        İsteğiniz İşleniyor...
                                                    </Dialog.Title>
                                                </div>
                                            </Transition.Child>
                                        </div>
                                    </Dialog>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"/>
                </div>
            </div>
        </div>
    )
}