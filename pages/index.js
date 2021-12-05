export default function Main() {
    return (
        <div className="bg-sis-gray h-screen font-phenomenaBold">
            <div
                className=" max-w-7xl m-auto py-12 px-4 text-center sm:text-left sm:px-64 sm:py-72 lg:py-72 lg:px-12 lg:flex lg:items-center lg:justify-between">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    <img src="banner.png" className="h-40"/>
                </h2>
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                    <div className="inline-flex rounded-md shadow">
                        <a
                            href="/login/student"
                            className="text-2xl h-16 inline-flex items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-white bg-sis-yellow hover:bg-sis-yellow"
                        >
                            Öğrenci Girişi
                        </a>
                    </div>
                    <div className="ml-3 inline-flex rounded-md shadow">
                        <a
                            href="/login/teacher"
                            className="text-2xl h-16 inline-flex items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-white bg-sis-darkblue hover:bg-sis-darkblue"
                        >
                            Öğretmen Girişi
                        </a>
                    </div>
                    <div className="ml-3 inline-flex rounded-md shadow">
                        <a
                            href="/login/officer"
                            className="text-2xl h-16 inline-flex items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-white bg-sis-blue hover:bg-sis-blue"
                        >
                            Personel Girişi
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
