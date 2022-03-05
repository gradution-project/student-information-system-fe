import SISTitle from "../public/components/page-titles";
import {useState} from "react";

export default function UnauthorizedAccessPage({user}) {

    const [homePagePath] = useState("/" + user);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-sis-yellow">
            <SISTitle/>
            <div className="px-60 py-40 bg-white rounded-3xl shadow-xl">
                <div className="flex flex-col items-center">
                    <h1 className="font-phenomenaExtraBold text-sis-darkblue md:text-9xl">401</h1>

                    <h6 className="mb-8 text-2xl font-bold text-center md:text-4xl">
                        <span className="font-phenomenaExtraBold text-sis-yellow">YETKİSİZ ERİŞİM!</span>
                    </h6>

                    <div>
                        <a href="javascript:history.back()" className="mr-8 px-6 py-3 text-sm font-semibold text-sis-white bg-sis-blue rounded-xl">
                            Geri Dön
                        </a>

                        <a href={homePagePath}  className="ArrowLeftIcon px-6 py-3 text-sm font-semibold text-sis-white bg-sis-blue rounded-xl">
                           Ana Ekran
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
