import SISTitle from "../../../../public/components/page-titles";
import {useState} from "react";
import {useRouter} from "next/router";
import OfficerNavbar from "../../../../public/components/navbar/officer/officer-navbar";
import UnauthorizedAccessPage from "../../../401";
import SisOfficerStorage from "../../../../public/storage/officer/SisOfficerStorage";
import ProcessNotification from "../../../../public/notifications/process";
import SuccessNotification from "../../../../public/notifications/success";
import FailNotification from "../../../../public/notifications/fail";
import OfficerController from "../../../../public/api/officer/OfficerController";
import SisOperationButton from "../../../../public/components/buttons/SisOperationButton";

export async function getServerSideProps(context) {
    const officerId = SisOfficerStorage.getNumberWithContext(context);
    if (officerId === undefined) {
        return {
            props: {
                isPagePermissionSuccess: false
            }
        }
    }

    const officerData = await OfficerController.getOfficerDetailByOfficerId(officerId);
    if (officerData.success) {
        return {
            props: {
                isPagePermissionSuccess: true,
                operationUserId: officerId,
                officer: officerData.response
            }
        }
    }
}


export default function OfficerMyInformation({isPagePermissionSuccess, operationUserId, officer}) {

    if (!isPagePermissionSuccess) {
        return (
            <UnauthorizedAccessPage user=""/>
        )
    }

    const {academicInfoResponse} = officer;
    const {personalInfoResponse} = officer;

    const {facultyResponse} = academicInfoResponse;
    const {name, surname, tcNo, birthday} = personalInfoResponse;


    const router = new useRouter();

    let [isOpenProcessingPersonalInfoUpdateNotification, setIsOpenProcessingPersonalInfoUpdateNotification] = useState(false);

    function closeProcessingPersonalInfoUpdateNotification() {
        setIsOpenProcessingPersonalInfoUpdateNotification(false);
    }

    function openProcessingPersonalInfoUpdateNotification() {
        setIsOpenProcessingPersonalInfoUpdateNotification(true);
    }

    let [isOpenSuccessPersonalInfoUpdateNotification, setIsOpenSuccessPersonalInfoUpdateNotification] = useState(false);

    function closeSuccessPersonalInfoUpdateNotification() {
        setIsOpenSuccessPersonalInfoUpdateNotification(false);
        router.reload();
    }

    function openSuccessPersonalInfoUpdateNotification() {
        setIsOpenSuccessPersonalInfoUpdateNotification(true);
    }

    let [isOpenFailPersonalInfoUpdateNotification, setIsOpenFailPersonalInfoUpdateNotification] = useState(false);

    function closeFailPersonalInfoUpdateNotification() {
        setIsOpenFailPersonalInfoUpdateNotification(false);
    }

    function openFailPersonalInfoUpdateNotification() {
        setIsOpenFailPersonalInfoUpdateNotification(true);
    }

    const [email, setEmail] = useState(personalInfoResponse.email);
    const changeEmail = event => {
        const email = event.target.value;
        setEmail(email);
    }

    const [address, setAddress] = useState(personalInfoResponse.address);
    const changeAddress = event => {
        const address = event.target.value;
        setAddress(address);
    }

    const [phoneNumber, setPhoneNumber] = useState(personalInfoResponse.phoneNumber);
    const changePhoneNumber = event => {
        const phoneNumber = event.target.value;
        setPhoneNumber(phoneNumber);
    }

    const officerUpdatePersonal = async (event) => {
        openProcessingPersonalInfoUpdateNotification();

        event.preventDefault();

        const officerId = academicInfoResponse.officerId;
        const personalInfo = {name, surname, tcNo, email, birthday, address, phoneNumber};
        const personalInfoData = await OfficerController.updateOfficerPersonalInfo(operationUserId, officerId, personalInfo);
        if (personalInfoData.success) {
            closeProcessingPersonalInfoUpdateNotification();
            openSuccessPersonalInfoUpdateNotification();
        } else {
            closeProcessingPersonalInfoUpdateNotification();
            openFailPersonalInfoUpdateNotification();
        }
    }

    return (
        <>
            <SISTitle/>
            <OfficerNavbar/>
            <div>
                <div className="select-none md:col-span-1">
                    <form className="mt-10 mb-4 max-w-3xl mx-auto space-y-6">
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                    <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                        AKADEM??K B??LG??LER??M
                                    </h3>
                                </div>
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="teacher-number"
                                               className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                            PERSONEL NUMARASI
                                        </label>
                                        <input
                                            type="text"
                                            name="teacher-number"
                                            id="teacher-number"
                                            value={academicInfoResponse.officerId}
                                            disabled
                                            className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="registration-date"
                                               className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                            KAYIT TAR??H??
                                        </label>
                                        <input
                                            type="text"
                                            name="registration-date"
                                            id="registration-date"
                                            value={academicInfoResponse.registrationDate}
                                            disabled
                                            className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="faculty"
                                               className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                            FAK??LTE ADI
                                        </label>
                                        <select
                                            id="faculty"
                                            name="faculty"
                                            autoComplete="faculty-name"
                                            disabled
                                            className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                        >
                                            <option>{facultyResponse.name}</option>
                                        </select>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="phone"
                                               className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                            DAH??L?? TELEFON
                                        </label>
                                        <input
                                            type="text"
                                            name="phone"
                                            id="phone"
                                            disabled
                                            value={academicInfoResponse.phoneNumber}
                                            className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="email-address"
                                               className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                            E-MA??L ADRES??
                                        </label>
                                        <input
                                            type="text"
                                            name="email-address"
                                            id="email-address"
                                            disabled
                                            value={academicInfoResponse.email}
                                            className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="hidden sm:block" aria-hidden="true">
                <div className="py-5">
                    <div className="border-t border-gray-200"/>
                </div>
            </div>

            <div className="select-none mb-10 mt-10 sm:mt-0">
                <div className="md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="mt-4 max-w-3xl mx-auto space-y-6">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="mb-6 px-4 sm:px-0 bg-gray-50 rounded-xl">
                                        <h3 className="py-8 font-phenomenaExtraBold leading-6 text-sis-darkblue text-center text-3xl">
                                            K??????SEL B??LG??LER??M
                                        </h3>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6">

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="first-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                ADI
                                            </label>
                                            <input
                                                type="text"
                                                name="first-name"
                                                id="first-name"
                                                defaultValue={personalInfoResponse.name}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="last-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                SOYADI
                                            </label>
                                            <input
                                                type="text"
                                                name="last-name"
                                                id="last-name"
                                                defaultValue={personalInfoResponse.surname}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="tc-no"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                T.C. K??ML??K NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="tc-no"
                                                id="tc-no"
                                                defaultValue={personalInfoResponse.tcNo}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="birthday"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DO??UM TAR??H??
                                            </label>
                                            <input
                                                type="text"
                                                name="birthday"
                                                id="birthday"
                                                required
                                                minLength="10"
                                                maxLength="10"
                                                defaultValue={personalInfoResponse.birthday}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MA??L ADRES??
                                            </label>
                                            <input
                                                onChange={changeEmail}
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                defaultValue={personalInfoResponse.email}
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
                                                    changePhoneNumber(e)
                                                }}
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                required
                                                minLength="19"
                                                maxLength="19"
                                                defaultValue={personalInfoResponse.phoneNumber}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="home-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                EV ADRES??
                                            </label>
                                            <input
                                                onChange={changeAddress}
                                                type="text"
                                                name="home-address"
                                                id="home-address"
                                                autoComplete="home-address"
                                                defaultValue={personalInfoResponse.address}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    {/*
                                  <div className="py-5 mt-2">
                                        <label className="text-xl text-sis-darkblue font-phenomenaBold">
                                            PROF??L FOTO??RAFI
                                        </label>
                                        <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path
                              d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                      </span>
                                            <button
                                                type="button"
                                                className="font-phenomenaBold ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-md text-sis-darkblue font-phenomenaRegular leading-4 text-gray-700 hover:bg-sis-yellow hover:text-sis-white"
                                            >
                                                Foto??raf?? G??ncelle
                                            </button>
                                        </div>
                                    </div>


                                    <div>
                                        <label className="text-xl text-sis-darkblue font-phenomenaBold">
                                            Foto??raf?? Y??kle
                                        </label>
                                        <div
                                            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                            <div className="space-y-1 text-center">
                                                <svg
                                                    className="mx-auto h-12 w-12 text-gray-400"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <div className="flex text-sm text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer bg-white rounded-md font-phenomenaBold text-lg text-sis-yellow hover:text-sis-yellow"
                                                    >
                                                        <span>Dosyay?? y??kleyin</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                               className="sr-only"/>
                                                    </label>
                                                    <p className="pl-1 text-lg font-phenomenaRegular">veya s??r??kleyip
                                                        b??rak??n.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

*/}

                                    {(
                                        personalInfoResponse.modifiedDate !== null
                                            ?
                                            <div className="mt-6 sm:col-span-6">
                                                <a className="font-phenomenaRegular text-sis-blue text-xl">
                                                    Son D??zenlenme Tarihi : {personalInfoResponse.modifiedDate}
                                                </a>
                                            </div>
                                            :
                                            null
                                    )}
                                </div>

                                {SisOperationButton.getUpdateButton(officerUpdatePersonal, "G??NCELLE")}

                                <ProcessNotification
                                    isOpen={isOpenProcessingPersonalInfoUpdateNotification}
                                    closeNotification={closeProcessingPersonalInfoUpdateNotification}
                                    title="Ki??isel Bilgi G??ncelleme ??ste??iniz ????leniyor..."
                                />

                                <SuccessNotification
                                    isOpen={isOpenSuccessPersonalInfoUpdateNotification}
                                    closeNotification={closeSuccessPersonalInfoUpdateNotification}
                                    title="Ki??isel Bilgi G??ncelleme ????lemi Ba??ar??l??!"
                                    description="Ki??isel Bilgi G??ncelleme ????lemi ba??ar??yla ger??ekle??ti."
                                />

                                <FailNotification
                                    isOpen={isOpenFailPersonalInfoUpdateNotification}
                                    closeNotification={closeFailPersonalInfoUpdateNotification}
                                    title="Ki??isel Bilgi G??ncelleme ????lemi Ba??ar??s??z!"
                                    description="L??tfen girdi??iniz verileri kontrol ediniz.
                                    Verilerinizi do??ru girdiyseniz
                                    sistemsel bir hatadan dolay?? iste??iniz sonu??land??ralamam???? olabilir."
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}