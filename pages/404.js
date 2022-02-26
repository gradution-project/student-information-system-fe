import SISTitle from "../public/components/page-titles";

export default function PageNotFound() {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-sis-yellow">
            <SISTitle/>
            <div className="px-60 py-40 bg-white rounded-3xl shadow-xl">
                <div className="flex flex-col items-center">
                    <h1 className="font-phenomenaExtraBold text-sis-darkblue md:text-9xl">404</h1>

                    <h6 className="mb-8 text-2xl font-bold text-center md:text-4xl">
                        <span className="font-phenomenaExtraBold text-sis-yellow">SAYFA BULUNAMADI!</span>
                    </h6>

                    <div>
                        <a href="javascript:history.back()" className="mr-8 px-6 py-3 text-sm font-semibold text-sis-white bg-sis-blue rounded-xl">
                            Geri Dön
                        </a>

                        <a href="/"  className="ArrowLeftIcon px-6 py-3 text-sm font-semibold text-sis-white bg-sis-blue rounded-xl">
                           Ana Ekran
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
