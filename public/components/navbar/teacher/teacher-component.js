import {Fragment} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {
    BookmarkAltIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorClickIcon,
    DocumentReportIcon,
    ViewGridIcon,
} from '@heroicons/react/outline'
import {ChevronDownIcon} from '@heroicons/react/solid'

const solutions = [

    {
        name: 'Bölüm Dönem Dersleri',
        description: '',
        href: '/student/lesson/department',
        icon: ChartBarIcon,
    },
    {
        name: 'Derslerim',
        description: '',
        href: '/student/lesson/registration',
        icon: CursorClickIcon,
    },
    {
        name: 'Ders Programı',
        description: "",
        href: '/student/schedule/lesson',
        icon: CalendarIcon,
    },
    {
        name: 'Sınav Programı',
        description: "",
        href: '/student/schedule/exam',
        icon: ViewGridIcon,
    },
]

const resources = [
    {
        name: 'Staj İşlemleri',
        description: '',
        href: '/student/notes',
        icon: BookmarkAltIcon,
    },
    {
        name: 'Mezuniyet İşlemleri',
        description: '',
        href: '/student/transcript',
        icon: DocumentReportIcon,
    },
    {
        name: 'Ders Kayıt İşlemleri',
        description: '',
        href: '/student/transcript',
        icon: CalendarIcon,
    },
]
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TeacherComponent() {

    return (
        <Popover.Group as="nav" className="hidden md:flex space-x-10 font-phenomenaBold">
            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button
                            className={classNames(
                                open ? 'text-sis-lightblue' : 'text-gray-500',
                                'group bg-white rounded-md inline-flex items-center text-xl font-medium hover:text-sis-lightblue'
                            )}
                        >
                            <span>DERS İŞLEMLERİ</span>
                            <ChevronDownIcon
                                className={classNames(
                                    open ? 'text-sis-lightblue' : 'text-gray-500',
                                    'ml-2 h-5 w-5 group-hover:text-sis-yellow'
                                )}
                                aria-hidden="true"
                            />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                <div
                                    className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                        {solutions.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                            >
                                                <item.icon className="flex-shrink-0 h-6 w-6 text-sis-lightblue"
                                                           aria-hidden="true"/>
                                                <div className="ml-4">
                                                    <p className="font-phenomenaRegular text-xl text-gray-800">{item.name}</p>
                                                    <p className="mt-1 text-sm text-gray-500 font-phenomenaThin">{item.description}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>

            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button
                            className={classNames(
                                open ? 'text-sis-yellow' : 'text-gray-500',
                                'group bg-white rounded-md inline-flex items-center text-xl hover:text-sis-yellow focus:outline-none'
                            )}
                        >
                            <span>DİĞER İŞLEMLERİ</span>
                            <ChevronDownIcon
                                className={classNames(
                                    open ? 'text-sis-yellow' : 'text-gray-500',
                                    'ml-2 h-5 w-5 group-hover:text-sis-yellow'
                                )}
                                aria-hidden="true"
                            />
                        </Popover.Button>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <Popover.Panel
                                className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                                <div
                                    className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                        {resources.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                            >
                                                <item.icon className="flex-shrink-0 h-6 w-6 text-sis-yellow"
                                                           aria-hidden="true"/>
                                                <div className="ml-4">
                                                    <p className="font-phenomenaRegular text-xl text-gray-800">{item.name}</p>
                                                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Popover.Panel>
                        </Transition>
                    </>
                )}
            </Popover>

            <a href=""
               className="text-xl font-medium text-gray-500 hover:text-sis-lightblue">
                NOT İŞLEMLERİ
            </a>

            <a href=""
               className="text-xl font-medium text-gray-500 hover:text-sis-lightblue">
                YOKLAMA SİSTEMİ
            </a>

        </Popover.Group>
    )
}
