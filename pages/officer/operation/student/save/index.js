import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {Fragment, useState} from "react";
import {useRouter} from "next/router";
import {Dialog, Transition} from "@headlessui/react";


export default function SaveTeacher() {

    const router = useRouter();

    const [studentName, setStudentName] = useState();
    const changeStudentName = event => {
        const studentName = event.target.value;
        setStudentName(studentName);
    }

    const [studentSurname, setStudentSurname] = useState();
    const changeStudentSurname = event => {
        const studentSurname = event.target.value;
        setStudentSurname(studentSurname);
    }

    const [studentTcNo, setStudentTcNo] = useState();
    const changeStudentTcNo = event => {
        const studentTcNo = event.target.value;
        setStudentTcNo(studentTcNo);
    }

    const [studentBirthday, setStudentBirthday] = useState();
    const changeStudentBirthday = event => {
        const studentBirthday = event.target.value;
        setStudentBirthday(studentBirthday);
    }

    const [studentEmail, setStudentEmail] = useState();
    const changeStudentEmail = event => {
        const studentEmail = event.target.value;
        setStudentEmail(studentEmail);
    }

    const [studentClassLevel, setStudentClassLevel] = useState();
    const changeStudentClassLevel = event => {
        const studentClassLevel = event.target.value;
        setStudentClassLevel(studentClassLevel);
    }

    const [studentAddress, setStudentAddress] = useState();
    const changeStudentAddress = event => {
        const studentAddress = event.target.value;
        setStudentAddress(studentAddress);
    }

    const [studentDegree, setStudentDegree] = useState();
    const changeStudentDegree = event => {
        const studentDegree = event.target.value;
        setStudentDegree(studentDegree);
    }

    const [studentDepartmentId, setStudentDepartmentId] = useState();
    const changeStudentDepartmentId = event => {
        const studentDepartmentId = event.target.value;
        console.log(studentDepartmentId);
        setStudentDepartmentId(studentDepartmentId);
    }

    const [studentPhoneNumber, setStudentPhoneNumber] = useState();
    const changeStudentPhoneNumber = event => {
        const studentPhoneNumber = event.target.value;
        setStudentPhoneNumber(studentPhoneNumber);
    }


    let [isOpenSuccess, setIsOpenSuccess] = useState(false);

    function closeSuccessModal() {
        setIsOpenSuccess(false);
        router.push("/officer/operation/student");
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

    const studentSave = async (event) => {
        openProcessingModal();

        event.preventDefault();

        const saveRes = await fetch("http://localhost:8585/student/save", {
            body: JSON.stringify({
                academicInfoRequest: {
                    degree: studentDegree,
                    departmentId: studentDepartmentId,
                    classLevel: studentClassLevel,
                },
                personalInfoRequest: {
                    address: studentAddress,
                    birthday: "2021-12-18T18:13:28.268Z",
                    email: studentEmail,
                    name: studentName,
                    phoneNumber: studentPhoneNumber,
                    surname: studentSurname,
                    tcNo: studentTcNo
                }
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });
        const saveData = await saveRes.json();
        console.log(saveData);
        console.log(saveData.success);
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
                        <form className="px-4 py-5 max-w-2xl mx-auto space-y-6" onSubmit={studentSave}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="bg-white sm:p-6">
                                    <div className="px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="mb-8 py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-4xl">
                                            ÖĞRENCİ EKLEME
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ADI
                                            </label>
                                            <input
                                                onChange={changeStudentName}
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SOYADI
                                            </label>
                                            <input
                                                onChange={changeStudentSurname}
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="tc-no"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                T.C. KİMLİK NUMARASI
                                            </label>
                                            <input
                                                onChange={changeStudentTcNo}
                                                type="text"
                                                name="tc-no"
                                                id="tc-no"
                                                minLength="11"
                                                maxLength="11"
                                                pattern="[0-9.]+"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="birthday"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DOĞUM TARİHİ
                                            </label>
                                            <input
                                                onChange={changeStudentBirthday}
                                                type="text"
                                                name="birthday"
                                                id="birthday"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MAİL ADRESİ
                                            </label>
                                            <input
                                                onChange={changeStudentEmail}
                                                type="email"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phone-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                TELEFON NUMARASI
                                            </label>
                                            <input
                                                onChange={changeStudentPhoneNumber}
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                required
                                                minLength="10"
                                                maxLength="10"
                                                pattern="[0-9.]+"
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="home-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                EV ADRESİ
                                            </label>
                                            <input
                                                onChange={changeStudentAddress}
                                                type="text"
                                                name="home-address"
                                                id="home-address"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="degree"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ÜNVANI
                                            </label>
                                            <select
                                                onChange={changeStudentDegree}
                                                id="degree"
                                                name="degree"
                                                autoComplete="degree"
                                                value={studentDegree}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Ünvan Seçiniz...</option>
                                                <option value="ASSOCIATE">Asistan Öğrenci</option>
                                                <option value="UNDERGRADUATE">Lisans Öğrencisi</option>
                                                <option value="POSTGRADUATE">Yüksek lisans Öğrencisi</option>
                                                <option value="DOCTORAL">Doktora Öğrencisi</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="classLevel"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SINIFI
                                            </label>
                                            <select
                                                onChange={changeStudentClassLevel}
                                                id="class-level"
                                                name="class-level"
                                                autoComplete="class-level"
                                                value={studentClassLevel}
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Sınıfı Seçiniz...</option>
                                                <option value="PREPARATORY">Hazırlık</option>
                                                <option value="FIRST">1. Sınıf</option>
                                                <option value="SECOND">2. Sınıf</option>
                                                <option value="THIRD">3. Sınıf</option>
                                                <option value="FOURTH">4. Sınıf</option>
                                                <option value="FIFTH">5. Sınıf</option>
                                                <option value="SIXTH">6. Sınıf</option>
                                                <option value="GRADUATE">Mezun</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="department"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                BÖLÜMÜ
                                            </label>
                                            <select
                                                onChange={changeStudentDepartmentId}
                                                id="department-id"
                                                name="department-id"
                                                autoComplete="department-id"
                                                value={studentDepartmentId}
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

                                            {/* This element is to trick the browser into centering the modal contents. */}
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
                                                            Öğrenci Ekleme İşlemi Başarılı!
                                                        </div>
                                                    </Dialog.Title>
                                                    <div className="mt-2">
                                                        <p className="text-xl text-gray-400 text-center font-phenomenaRegular">
                                                            Öğrenci Ekleme İşlemi başarıyla gerçekleşti.
                                                            Mesaj penceresini kapattıktan sonra öğretmen listeleme
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

                                            {/* This element is to trick the browser into centering the modal contents. */}
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
                                                            Öğrenci Ekleme İşlemi Başarısız!
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

                                            {/* This element is to trick the browser into centering the modal contents. */}
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