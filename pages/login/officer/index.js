import {LockClosedIcon} from '@heroicons/react/solid'
import SISTitle from "../../../public/components/page-titles";

export default function OfficerLogin() {
    return (
        <div className="bg-sis-gray h-screen">
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <SISTitle/>
                <div className="sm:mt-0">
                    <img
                        className="h-28 w-auto mb-16"
                        src="https://i.hizliresim.com/em7bd2l.png"
                        alt="Workflow"
                    />
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="md:col-span-1 ">
                                <div className="px-4 sm:px-0">
                                </div>
                            </div>
                            <form className="px-4 max-w-2xl mx-auto space-y-6">

                                <div className="shadow overflow-hidden sm:rounded-md">
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <h2 className="mt-8 font-phenomenaExtraBold text-center text-5xl text-sis-darkblue mb-6">
                                            PERSONEL GİRİŞİ
                                        </h2>
                                    </div>
                                    <div className="px-4 py-5 bg-white sm:p-6">
                                        <div className="grid grid-cols-1 gap-6">

                                            <div className="sm:col-span-1">
                                                <label htmlFor="first-name"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    PERSONEL NUMARASI
                                                </label>
                                                <input
                                                    id="teacher-number"
                                                    name="teacher-number"
                                                    type="text"
                                                    autoComplete="current-username"
                                                    minLength="8"
                                                    maxLength="8"
                                                    required
                                                    pattern="[0-9.]+"
                                                    className="font-phenomenaRegular text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                />
                                            </div>

                                            <div className="sm:col-span-1">
                                                <label htmlFor="last-name"
                                                       className="ml-0.5 text-xl text-sis-darkblue font-phenomenaBold">
                                                    ŞİFRE
                                                </label>
                                                <input
                                                    id="password"
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                    className="font-phenomenaRegular text-sis-yellow mt-1 focus:ring-sis-yellow focus:border-sis-yellow block w-full shadow-sm sm:text-xl border-gray-300 rounded-md focus:text-sis-darkblue"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                    <div className="px-4 py-3 text-right sm:px-6">

                                        <div>
                                            <button
                                                type="submit"
                                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sis-yellow hover:bg-sis-yellow"
                                            >
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                <LockClosedIcon
                                                    className="h-5 w-5 text-sis-white group-hover:text-sis-white"
                                                    aria-hidden="true"/>
                                            </span>
                                                <a href="/officer" className="font-phenomenaBold text-lg">Giriş Yap</a>
                                            </button>
                                        </div>

                                        <div className="text-sm text-center mt-2">
                                            <a href="/login/forgot-password"
                                               className="font-phenomenaBold text-lg text-sis-darkblue hover:text-sis-yellow">
                                                Şifrenizi mi unuttunuz?
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
