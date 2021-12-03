import Head from 'next/head'

export default function Index() {
    return (
        <div className="container">
            <Head>
                <title>Öğrenci Bilgi Sistemi</title>
                <link rel="icon" href="/icon.png"/>
                <link href="http://fonts.cdnfonts.com/css/phenomena" rel="stylesheet"/>
            </Head>

            <main>
                <div className="container1">
                    <img src="/banner.png" alt="Öğrenci Bilgi Sistemi" className="banner"/>
                </div>

                <div className="butonlar">
                    <div className="ogrenci">
                        <a href="" className="card">
                            <h3>ÖĞRENCİ GİRİŞ</h3>
                        </a>
                    </div>
                    <div className="ogretmen">
                        <a href="" className="card1">
                            <h3>ÖĞRETMEN GİRİŞİ</h3>
                        </a>
                    </div>
                    <div className="personel">
                        <a href="" className="card2">
                            <h3>PERSONEL GİRİŞİ</h3>
                        </a>
                    </div>
                </div>

            </main>

            <footer>
                <a
                    href=""
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="/icon.png" alt="Öğrenci Bilgi Sistemi" className="banner"/>
                    Öğrenci Bilgi Sistemi
                </a>
            </footer>

            <style jsx>{`

              .container1 {
                background: #F8B040;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
              }

              .container {
                min-height: 100vh;
                padding: 0;
                justify-content: center;
                align-items: center;
              }

              main {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #212f3a;
              }


              footer {
                position: fixed;
                width: 100%;
                height: 50px;
                bottom: 0px;
                left: 0px;
                padding: 10px;
                border-top: 1px solid #eaeaea;

              }

              footer img {
                margin-left: 0.5rem;
                height: 25px;
                margin-top: 17px;
              }

              footer a {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 25px;

              }


              a {
                color: inherit;
                text-decoration: none;
              }

              .title a {
                color: #212f3a;
                text-decoration: none;
              }

              .title a:hover,
              .title a:focus,
              .title a:active {
                text-decoration: underline;
              }

              .title {
                margin: 0;
                line-height: 1.15;
                font-size: 4rem;
              }

              .title,
              .description {
                text-align: center;
              }

              .description {
                line-height: 1.5;
                font-size: 1.5rem;
              }

              code {
                background: #fafafa;
                border-radius: 5px;
                padding: 0.75rem;
                font-size: 1.1rem;
                font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
                DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
              }

              .ogrenci {
                float: left;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                max-width: 800px;
                margin-top: 10rem;

              }

              .ogretmen {
                float: left;
                display: flex;
                margin-left: 20px;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                max-width: 800px;
                margin-top: 10rem;

              }

              .personel {
                float: left;
                display: flex;
                margin-left: 20px;
                flex-direction: row;
                justify-content: center;
                align-items: center;
                flex-wrap: wrap;
                max-width: 800px;
                margin-top: 10rem;


              }

              .card {
                margin: 1rem;
                flex-basis: 45%;
                padding: 1.5rem;
                text-align: left;
                color: inherit;
                text-decoration: none;
                border: 2px solid #eaeaea;
                border-radius: 10px;
                transition: color 0.15s ease, border-color 0.15s ease;
              }

              .card1 {
                margin: 1rem;
                flex-basis: 45%;
                padding: 1.5rem;
                text-align: left;
                color: inherit;
                text-decoration: none;
                border: 2px solid #eaeaea;
                border-radius: 10px;
                transition: color 0.15s ease, border-color 0.15s ease;
              }

              .card2 {
                margin: 1rem;
                flex-basis: 45%;
                padding: 1.5rem;
                text-align: left;
                color: inherit;
                text-decoration: none;
                border: 2px solid #eaeaea;
                border-radius: 10px;
                transition: color 0.15s ease, border-color 0.15s ease;
              }

              .card:hover,
              .card:focus,
              .card:active {
                color: #B8EBFF;
                border-color: #B8EBFF;
              }

              .card1:hover,
              .card1:focus,
              .card1:active {
                color: #F8B040;
                border-color: #F8B040;
              }

              .card2:hover,
              .card2:focus,
              .card2:active {
                color: #3AAAE2;
                border-color: #3AAAE2;
              }

              .card h3 {
                margin: 0 0 1rem 0;
                font-size: 2.5rem;
              }

              .card1 h3 {
                margin: 0 0 1rem 0;
                font-size: 2.5rem;
              }

              .card2 h3 {
                margin: 0 0 1rem 0;
                font-size: 2.5rem;
              }

              .logo {
                height: 1em;
              }

              .banner {
                height: 10em;
                margin-bottom: 15px;
              }

              @media (max-width: 600px) {
                .grid {
                  width: 100%;
                  flex-direction: column;
                }
              }
            `}</style>

            <style jsx global>{`
              html,
              body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, 'Phenomena',
                sans-serif;
              }

              * {
                box-sizing: border-box;
              }
            `}</style>
        </div>
    )
}