import SISTitle from "../../../../public/components/page-titles";
import OfficerNavbar from "../../../../public/components/navbar/officer/officer-navbar";
import Cookies from "universal-cookie";

export default function MyInfo() {
    const cookies = new Cookies();
    return (
        <>
            <SISTitle/>
            <OfficerNavbar/>
            <div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="md:col-span-1">
                        <form className="px-4 py-5 max-w-2xl mx-auto space-y-6" action="#" method="POST">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <div className="px-4 py-4 bg-gray-50 text-right sm:px-6">
                                    <h3 className="mt-4 font-phenomenaExtraBold text-center text-5xl text-sis-darkblue mb-6">
                                        AKADEMİK BİLGİLERİM
                                    </h3>
                                </div>
                                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="officer-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                PERSONEL NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="officer-number"
                                                id="officer-number"
                                                value={cookies.get('officerNumber')}
                                                disabled
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="faculty-name"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                FAKÜLTE ADI
                                            </label>
                                            <select
                                                id="faculty"
                                                name="faculty"
                                                autoComplete="faculty-name"
                                                disabled
                                                className="font-phenomenaRegular text-gray-500 mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow sm:text-xl"
                                            >
                                                <option>{cookies.get('officerFaculty')}</option>
                                            </select>
                                        </div>

                                        <div className="sm:col-span-4">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MAİL ADRESİ
                                            </label>
                                            <input
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                disabled
                                                value={cookies.get('officerAcademicEmail')}
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="phoneNumber"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DAHİLİ TELEFON
                                            </label>
                                            <input
                                                type="text"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                disabled
                                                value={cookies.get('officerAcademicPhoneNumber')}
                                                className="font-phenomenaRegular text-gray-400 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                    </div>

                                </div>
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

            <div className="mt-10 sm:mt-0">
                <div className="mt-5 md:mt-0 md:col-span-2">
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form className="px-4 max-w-2xl mx-auto space-y-6" action="#" method="POST">
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-4 bg-gray-50 text-right sm:px-6">
                                    <h3 className="mt-4 font-phenomenaExtraBold text-center text-5xl text-sis-darkblue mb-6">
                                        KİŞİSEL BİLGİLERİM
                                    </h3>
                                </div>
                                <div className="bg-white sm:p-6">
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
                                                defaultValue={cookies.get('officerName')}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
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
                                                defaultValue={cookies.get('officerSurname')}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="tc-no"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                T.C. KİMLİK NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="tc-no"
                                                id="tc-no"
                                                defaultValue={cookies.get('officerTcNo')}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="birthday"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                DOĞUM TARİHİ
                                            </label>
                                            <input
                                                type="text"
                                                name="birthday"
                                                id="birthday"
                                                defaultValue={cookies.get('officerBirthday')}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="email-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                E-MAİL ADRESİ
                                            </label>
                                            <input
                                                type="text"
                                                name="email-address"
                                                id="email-address"
                                                autoComplete="email"
                                                defaultValue={cookies.get('officerPersonalEmail')}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="phone-number"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                TELEFON NUMARASI
                                            </label>
                                            <input
                                                type="text"
                                                name="phone-number"
                                                id="phone-number"
                                                maxLength="13"
                                                defaultValue={cookies.get('officerPhoneNumber')}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>

                                        <div className="col-span-6">
                                            <label htmlFor="home-address"
                                                   className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                EV ADRESİ
                                            </label>
                                            <input
                                                type="text"
                                                name="home-address"
                                                id="home-address"
                                                autoComplete="home-address"
                                                defaultValue={cookies.get('officerAddress')}
                                                className="font-phenomenaRegular text-gray-700 mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="py-5 mt-2">
                                        <label className="text-xl text-sis-darkblue font-phenomenaBold">
                                            PROFİL FOTOĞRAFI
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
                                                Fotoğrafı Güncelle
                                            </button>
                                        </div>
                                    </div>


                                    <div>
                                        <label className="text-xl text-sis-darkblue font-phenomenaBold">
                                            Fotoğrafı Yükle
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
                                                        <span>Dosyayı yükleyin</span>
                                                        <input id="file-upload" name="file-upload" type="file"
                                                               className="sr-only"/>
                                                    </label>
                                                    <p className="pl-1 text-lg font-phenomenaRegular">veya sürükleyip
                                                        bırakın.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                    <button
                                        type="submit"
                                        className=" font-phenomenaBold inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xl rounded-md text-white bg-sis-yellow hover:bg-sis-darkblue"
                                    >
                                        KAYDET
                                    </button>
                                </div>
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
        </>
    )
}