import SISTitle from "../../../../../public/components/page-titles";
import OfficerNavbar from "../../../../../public/components/navbar/officer/officer-navbar";
import {useState} from "react";
import {useRouter} from "next/router";
import UnauthorizedAccessPage from "../../../../401";
import SisOfficerStorage from "../../../../../public/storage/officer/SisOfficerStorage";
import ProcessNotification from "../../../../../public/notifications/process";
import SuccessNotification from "../../../../../public/notifications/success";
import FailNotification from "../../../../../public/notifications/fail";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const SIS_API_URL = process.env.SIS_API_URL;
    const SIS_FE_URL = process.env.SIS_FE_URL;
    const facultyResponses = await fetch(`${SIS_API_URL}/faculty?status=ACTIVE`, {
        headers: {'Content-Type': 'application/json'},
        method: 'GET'
    });
    const facultyDatas = await facultyResponses.json();
    if (facultyDatas.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                SIS_API_URL: SIS_API_URL,
                SIS_FE_URL: SIS_FE_URL,
                faculties: facultyDatas.response
            }
        }
    }
}

export default function SaveOfficer({isPagePermissionSuccess, operationUserId, SIS_API_URL, SIS_FE_URL, faculties}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user="officer"/>
        )
    }

    const router = useRouter();

    let [isOpenSuccessSaveNotification, setIsOpenSuccessSaveNotification] = useState(false);

    function closeSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(false);
        router.push("/officer/operation/staff").then(() => router.reload());
    }

    function openSuccessSaveNotification() {
        setIsOpenSuccessSaveNotification(true);
    }

    let [isOpenFailSaveNotification, setIsOpenFailSaveNotification] = useState(false);

    function closeFailSaveNotification() {
        setIsOpenFailSaveNotification(false);
    }

    function openFailSaveNotification() {
        setIsOpenFailSaveNotification(true);
    }

    let [isOpenProcessingSaveNotification, setIsOpenProcessingSaveNotification] = useState(false);

    function closeProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(false);
    }

    function openProcessingSaveNotification() {
        setIsOpenProcessingSaveNotification(true);
    }


    const [officerName, setOfficerName] = useState();
    const changeOfficerName = event => {
        const officerName = event.target.value;
        setOfficerName(officerName);
    }

    const [officerSurname, setOfficerSurname] = useState();
    const changeOfficerSurname = event => {
        const officerSurname = event.target.value;
        setOfficerSurname(officerSurname);
    }

    const [officerTcNo, setOfficerTcNo] = useState();
    const changeOfficerTcNo = event => {
        const officerTcNo = event.target.value;
        setOfficerTcNo(officerTcNo);
    }

    const [officerBirthday, setOfficerBirthday] = useState();
    const changeOfficerBirthday = event => {
        const officerBirthday = event.target.value;
        setOfficerBirthday(officerBirthday);
    }

    const [officerEmail, setOfficerEmail] = useState();
    const changeOfficerEmail = event => {
        const officerEmail = event.target.value;
        setOfficerEmail(officerEmail);
    }

    const [officerAddress, setOfficerAddress] = useState();
    const changeOfficerAddress = event => {
        const officerAddress = event.target.value;
        setOfficerAddress(officerAddress);
    }

    const [officerPhoneNumber, setOfficerPhoneNumber] = useState();
    const changeOfficerPhoneNumber = event => {
        const officerPhoneNumber = event.target.value;
        setOfficerPhoneNumber(officerPhoneNumber);
    }

    const [officerFacultyId, setOfficerFacultyId] = useState();
    const changeOfficerFacultyId = event => {
        const officerFacultyId = event.target.value;
        setOfficerFacultyId(officerFacultyId);
    }

    const [officerPhone, setOfficerPhone] = useState();
    const changeOfficerPhone = event => {
        const officerPhone = event.target.value;
        setOfficerPhone(officerPhone);
    }

    const officerSave = async (event) => {
        openProcessingSaveNotification();

        event.preventDefault();

        const saveRes = await fetch(`${SIS_API_URL}/officer/save`, {
            body: JSON.stringify({

                academicInfoRequest: {
                    facultyId: officerFacultyId,
                    phoneNumber: officerPhone
                },
                operationInfoRequest: {
                    userId: operationUserId,
                    feUrl: SIS_FE_URL
                },
                personalInfoRequest: {
                    address: officerAddress,
                    birthday: officerBirthday,
                    email: officerEmail,
                    name: officerName,
                    phoneNumber: officerPhoneNumber,
                    surname: officerSurname,
                    tcNo: officerTcNo

                }
            }),
            headers: {'Content-Type': 'application/json'},
            method: 'POST'
        });
        const saveData = await saveRes.json();
        if (saveData.success) {
            closeProcessingSaveNotification();
            openSuccessSaveNotification();
        } else {
            closeProcessingSaveNotification();
            openFailSaveNotification();
        }
    }

    return (
        <div>
            <SISTitle/>
            <OfficerNavbar/>
            <div className="select-none mt-10 sm:mt-0">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="px-4 py-5 max-w-2xl mx-auto space-y-6" onSubmit={officerSave}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="bg-white sm:p-6">
                                    <div className="px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="mb-8 py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-4xl">
                                            PERSONEL EKLEME
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ADI
                                            </label>
                                            <input
                                                onChange={changeOfficerName}
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
                                                onChange={changeOfficerSurname}
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
                                                onChange={changeOfficerTcNo}
                                                type="text"
                                                name="tc-no"
                                                id="tc-no"
                                                minLength="11"
                                                maxLength="11"
                                                pattern="[0-9]+"
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
                                                onChange={changeOfficerBirthday}
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
                                                onChange={changeOfficerEmail}
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
                                                onChange={(e) => {
                                                    let pNumberLength = e.target.value.length;
                                                    if (pNumberLength <= 1) {
                                                        e.target.value = "+90 (" + e.target.value;
                                                    }
                                                    if (pNumberLength > 7 && pNumberLength < 10) {
                                                        e.target.value = e.target.value + ") ";
                                                    }
                                                    if (pNumberLength > 12 && pNumberLength < 15) {
                                                        e.target.value = e.target.value + " ";
                                                    }
                                                    if (pNumberLength > 15 && pNumberLength < 18) {
                                                        e.target.value = e.target.value + " ";
                                                    }
                                                    changeOfficerPhoneNumber(e)
                                                }}
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                required
                                                minLength="19"
                                                maxLength="19"
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="home-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                EV ADRESİ
                                            </label>
                                            <input
                                                onChange={changeOfficerAddress}
                                                type="text"
                                                name="home-address"
                                                id="home-address"
                                                required
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-6">
                                            <label htmlFor="facultyId"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                FAKÜLTE
                                            </label>
                                            <select
                                                onChange={changeOfficerFacultyId}
                                                id="facultyId"
                                                name="faculty-id"
                                                autoComplete="faculty-id"
                                                className="font-phenomenaRegular text-gray-700 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>Fakülte Seçiniz...</option>
                                                {faculties.map((faculty) => (
                                                    <option key={faculty.facultyId}
                                                            value={faculty.facultyId}>{faculty.name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phoneNumber"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DAHİLİ NUMARA
                                            </label>
                                            <input
                                                onChange={(e) => {
                                                    let pNumberLength = e.target.value.length;
                                                    if (pNumberLength <= 1) {
                                                        e.target.value = "+90 (" + e.target.value;
                                                    }
                                                    if (pNumberLength > 7 && pNumberLength < 10) {
                                                        e.target.value = e.target.value + ") ";
                                                    }
                                                    if (pNumberLength > 12 && pNumberLength < 15) {
                                                        e.target.value = e.target.value + " ";
                                                    }
                                                    if (pNumberLength > 15 && pNumberLength < 18) {
                                                        e.target.value = e.target.value + " ";
                                                    }
                                                    changeOfficerPhone(e)
                                                }}
                                                type="text"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                required
                                                minLength="19"
                                                maxLength="19"
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
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

                                <ProcessNotification
                                    isOpen={isOpenProcessingSaveNotification}
                                    closeNotification={closeProcessingSaveNotification}
                                    title="Personel Kayıt İsteğiniz İşleniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessSaveNotification}
                                    closeNotification={closeSuccessSaveNotification}
                                    title="Personel Kaydı Tamamlandı!"
                                    description="Personel Kayıt İşlemi başarıyla gerçekleşti.
                                    Mesaj penceresini kapattıktan sonra Personel Listeleme ekranına yönlendirileceksiniz."
                                />

                                <FailNotification
                                    isOpen={isOpenFailSaveNotification}
                                    closeNotification={closeFailSaveNotification}
                                    title="Personel Kaydı Tamamlanamadı!"
                                    description="Lütfen girdiğiniz verileri kontrol ediniz.
                                    Verilerinizi doğru girdiyseniz
                                    sistemsel bir hatadan dolayı isteğiniz sonuçlandıralamamış olabilir."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}