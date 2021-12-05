import {LockClosedIcon} from '@heroicons/react/solid'

export default function StudentLogin() {
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://i.hizliresim.com/nf7qdmq.png"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 font-phenomenaExtraBold text-center text-5xl text-gray-700">ÖĞRENCİ GİRİŞİ</h2>
                </div>
                <form className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                //required
                                className="font-phenomenaThin text-xl tappearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-gray-800 rounded-t-md focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow focus:z-10"
                                placeholder="Öğrenci Numarası"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                //required
                                className="font-phenomenaThin text-xl appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-400 text-gray-800 rounded-b-md focus:outline-none focus:ring-sis-yellow focus:border-sis-yellow focus:z-10"
                                placeholder="Şifre"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-gray-700 focus:ring-gray-700 border-gray-700 rounded"
                            />
                            <label htmlFor="remember-me"
                                   className="ml-2 block text-gray-700 font-phenomenaRegular text-lg">
                                Beni Hatırla
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="/login/forgot-password"
                               className="font-phenomenaBold text-lg text-gray-700 hover:text-gray-700">
                                Şifrenizi mi unuttunuz?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sis-yellow hover:bg-sis-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sis-yellow"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-sis-white group-hover:text-sis-white" aria-hidden="true"/>
                            </span>
                            <a href="/dashboard/student" className="font-phenomenaBold text-lg">
                                Giriş Yap
                            </a>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
