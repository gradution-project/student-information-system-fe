import {Fragment, useState} from "react";
import {useRouter} from "next/router";
import {Dialog, Transition} from "@headlessui/react";
import OfficerNavbar from "../../../../../../public/components/navbar/officer/officer-navbar";
import SISTitle from "../../../../../../public/components/page-titles";


export default function SaveLesson() {

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

    const lessonSave = async (event) => {
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
                        <form className="px-4 py-5 max-w-2xl mx-auto space-y-6" onSubmit={lessonSave}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="bg-white sm:p-6">
                                    <div className="px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="mb-8 py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-4xl">
                                            DERS EKLEME
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
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
                                                required
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
                                                required
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
                                                value={lessonSemester}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Yarıyıl Seçiniz...</option>
                                                <option value="FIRST">1. Dönem</option>
                                                <option value="SECOND">2. Dönem</option>
                                                <option value="THIRD">3. Dönem</option>
                                                <option value="FOURTH">4. Dönem</option>
                                                <option value="FIFTH">5. Dönem</option>
                                                <option value="SIXTH">6. Dönem</option>
                                                <option value="SEVENTH">7. Dönem</option>
                                                <option value="EIGHTH">8. Dönem</option>
                                                <option value="NINTH">9. Dönem</option>
                                                <option value="TENTH">10. Dönem</option>
                                                <option value="ELEVENTH">11. Dönem</option>
                                                <option value="TWELFTH">12. Dönem</option>
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
                                                value={lessonCorE}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Ders Durumunu Seçiniz...</option>
                                                <option value="COMPULSORY">Zorunlu</option>
                                                <option value="ELECTIVE">Seçmeli</option>
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
                                                value={lessonStatus}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Statüyü Seçiniz...</option>
                                                <option value="ACTIVE">Aktif</option>
                                                <option value="PASSIVE">Pasif</option>
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
                                                value={lessonDepartmentId}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Bölüm Seçiniz...</option>
                                                <option value="11012">BİLGİSAYAR MÜHENDİSLİĞİ</option>
                                                <option value="11011">ELEKTRİK ELEKTRONİK MÜHENDİSLİĞİ</option>
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-success hover:bg-green-600"
                                    >
                                        KAYDET
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