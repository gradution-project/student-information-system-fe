import {Fragment} from 'react'
import {Popover, Transition} from '@headlessui/react'
import {
    BookmarkAltIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorClickIcon,
    RefreshIcon,
    ViewGridIcon,
} from '@heroicons/react/outline'
import {ChevronDownIcon} from '@heroicons/react/solid'

const solutions = [

    {
        name: 'Bölüm Dersleri',
        description: '',
        href: '/dashboard/student/department-lesson',
        icon: ChartBarIcon,
    },
    {
        name: 'Ders Kayıt',
        description: '',
        href: '/dashboard/student/registration',
        icon: CursorClickIcon,
    },
    {
        name: 'Ders Programı',
        description: "",
        href: '/dashboard/student/syllabus',
        icon: CalendarIcon,
    },
    {
        name: 'Sınav Programı',
        description: "",
        href: '/dashboard/student/exam',
        icon: ViewGridIcon,
    },
    {
        name: 'Staj Bilgileri',
        description: '',
        href: '/dashboard/student/internship',
        icon: RefreshIcon,
    },
]

const resources = [
    {
        name: 'Not Bilgisi',
        description: '',
        href: '/dashboard/student/notes',
        icon: BookmarkAltIcon,
    },
    {
        name: 'TransKript',
        description: '',
        href: '/dashboard/student/notes/transcript',
        icon: CalendarIcon,
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function StudentComponent() {

    return (
        <Popover.Group as="nav" className="hidden md:flex space-x-10">
            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button
                            className={classNames(
                                open ? 'text-gray-900' : 'text-gray-500',
                                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-sis-lightblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sis-yellow'
                            )}
                        >
                            <span>Ders İşlemleri</span>
                            <ChevronDownIcon
                                className={classNames(
                                    open ? 'text-gray-600' : 'text-gray-400',
                                    'ml-2 h-5 w-5 group-hover:text-sis-lightblue'
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
                                                <item.icon className="flex-shrink-0 h-6 w-6 text-sis-yellow"
                                                           aria-hidden="true"/>
                                                <div className="ml-4">
                                                    <p className="text-base font-medium text-gray-900">{item.name}</p>
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

            <Popover className="relative">
                {({open}) => (
                    <>
                        <Popover.Button
                            className={classNames(
                                open ? 'text-gray-900' : 'text-gray-500',
                                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-sis-lightblue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sis-yellow'
                            )}
                        >
                            <span>Not İşlemleri</span>
                            <ChevronDownIcon
                                className={classNames(
                                    open ? 'text-gray-600' : 'text-gray-400',
                                    'ml-2 h-5 w-5 group-hover:text-sis-lightblue'
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
                                                    <p className="text-base font-medium text-gray-900">{item.name}</p>
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

            <a href="/dashboard/student/roll-call-system"
               className="text-base font-medium text-gray-500 hover:text-sis-lightblue">
                Yoklama Sistemi
            </a>

        </Popover.Group>
    )
}
