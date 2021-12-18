import {Fragment} from 'react'
import {Menu, Popover, Transition} from '@headlessui/react'
import {XIcon} from '@heroicons/react/outline'
import TeacherComponent from "./teacher-component";
import Cookies from 'universal-cookie';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function TeacherNavbar() {

    const cookies = new Cookies();

    return (
        <Popover className="relative bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div
                    className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#">
                            <span className="sr-only">Workflow</span>
                            <img
                                className="h-8 w-auto sm:h-10"
                                src="https://i.hizliresim.com/em7bd2l.png"
                                alt=""
                            />
                        </a>
                    </div>
                    <TeacherComponent/>
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <Menu as="div" className="ml-3 relative">
                            <div>
                                <Menu.Button
                                    className="bg-gray-800 flex text-sm rounded-full focus:outline-none">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    className="font-phenomenaRegular origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({active}) => (
                                            <a
                                                className={classNames(active ? 'font-phenomenaExtraBold' : '', 'font-phenomenaExtraBold block px-4 py-2 text-xl text-center text-gray-700 bg-gray-50 rounded-xl')}
                                            >
                                                {cookies.get('teacherFullName')}
                                                <p className="font-phenomenaLight text-center text-lg">{cookies.get('teacherNumber')}</p>
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({active}) => (
                                            <a href="/teacher/information"
                                               className={classNames(active ? 'bg-sis-yellow text-sis-white text-lg rounded-xl' : '', 'block px-4 py-2 text-lg text-center text-gray-700')}>
                                                Bilgilerim
                                            </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({active}) => (
                                            <a
                                                href="/"
                                                className={classNames(active ? 'bg-sis-yellow text-sis-white text-lg rounded-xl' : 'rounded-xl border-sis-yellow', 'block px-4 py-2 text-lg text-center text-gray-700')}
                                            >
                                                Çıkış Yap
                                            </a>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus
                               className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                    <div
                        className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button
                                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true"/>
                                    </Popover.Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}
