import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from "./index.module.scss";
import {useTranslation} from "react-i18next";
import {COMMON_TNS} from "@/lib/i18n/consts";
import TextField from "@/components/atomic/TextField";
import { Dialog, Transition } from '@headlessui/react';
import React, {useCallback, useState, Fragment, useEffect} from "react";
import TextArea from "@/components/atomic/TextArea";
import InputFile from "@/components/atomic/InputFile";
import validator from 'validator';

type Props = {
  text: string,
  className: string,
};

export const ModalForm: React.FC<Props> = (props) => {
  const { t } = useTranslation([COMMON_TNS]);
  const [name, setName] = useState<string>('');
  const [mail, setMail] = useState<string>('');
  const [task, setTask] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [nameErr, setNameErr] = useState<boolean>(false);
  const [mailErr, setMailErr] = useState<boolean>(false);
  const [phoneErr, setPhoneErr] = useState<boolean>(false);
  const [companyErr, setCompanyErr] = useState<boolean>(false);
  const [taskErr, setTaskErr] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeChip, setActiveChip] = useState<Array<string>>([]);
  const [activeAbout, setActiveAbout] = useState<Array<string>>([]);
  const [activePlatform, setActivePlatform] = useState<Array<string>>([]);

  useEffect(() => {
    AOS.init();
  }, []);

  const initToHelper = useCallback((index) => {
    if (activeChip.includes(index)) {
      const updatedChips = activeChip.filter((item) => item !== index);
      setActiveChip(updatedChips);
    } else {
      setActiveChip([...activeChip, index]);
    }
  }, [activeChip]);

  const initToPlatform = useCallback((index) => {
    if (activePlatform.includes(index)) {
      const updatedChips = activePlatform.filter((item) => item !== index);
      setActivePlatform(updatedChips);
    } else {
      setActivePlatform([...activePlatform, index]);
    }
  }, [activePlatform]);

  const initToAbout = useCallback((index) => {
    if (activeAbout.includes(index)) {
      const updatedChips = activeAbout.filter((item) => item !== index);
      setActiveAbout(updatedChips);
    } else {
      setActiveAbout([...activeAbout, index]);
    }
  }, [activeAbout]);

  const toShow = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleNameChange = useCallback((value: string) => {
    setName(value);
  }, []);
  const handleMailChange = useCallback((value: string) => {
    setMail(value);
  }, []);
  const handleCompanyChange = useCallback((value: string) => {
    setCompany(value);
  }, []);
  const handlePhoneChange = useCallback((value: string) => {
    setPhone(value);
  }, []);
  const handleTaskChange = useCallback((value: string) => {
    setTask(value)
  }, []);
  const handleFileChange = useCallback((file: File | null) => {
    setFile(file);
  }, []);

  const sendForm = useCallback(() => {
    if (validator.isEmail(mail)) {
      setMailErr(false);
      console.log('mail:', mail);
    } else {
      setMailErr(true);
    }

    if (validator.isMobilePhone(mail)) {
      setPhoneErr(false);
      console.log('phone:', phone);
    } else {
      setPhoneErr(true);
    }

    if (name) {
      setNameErr(false);
      console.log('name:', name);
    } else {
      setNameErr(true);
    }

    if (company) {
      setCompanyErr(false);
      console.log('company:', company);
    } else  {
      setCompanyErr(true);
    }

    if (task) {
      setTaskErr(false);
      console.log('task:', task);
    } else {
      setTaskErr(true);
    }
  }, [name, mail, company, task, phone]);

  const helperData = [
    {
      id: 1,
      text: t('bidHelpChips.0')
    },
    {
      id: 2,
      text: t('bidHelpChips.1')
    },
    {
      id: 3,
      text: t('bidHelpChips.2')
    },
    {
      id: 4,
      text: t('bidHelpChips.3')
    }
  ];
  const platformData = [
    {
      id: 1,
      text: "IOS"
    },
    {
      id: 2,
      text: "Android"
    },
    {
      id: 3,
      text: "Web"
    },
    {
      id: 4,
      text: t('bidAnother')
    }
  ];
  const aboutData = [
    {
      id: 1,
      text: t('bidAbouts.0')
    },
    {
      id: 2,
      text: t('bidAbouts.1')
    },
    {
      id: 3,
      text: t('bidAbouts.2')
    },
    {
      id: 4,
      text: t('bidAbouts.3')
    },
    {
      id: 5,
      text: t('bidAbouts.4')
    },
    {
      id: 6,
      text: t('bidAbouts.5')
    },
    {
      id: 7,
      text: t('bidAbouts.6')
    },
  ];

  return (
    <>
      <button className={`${props.className} ${styles.btn}`} onClick={toShow}>
        {props.text}
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={toShow}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 md:p-10 lg:p-20 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel data-aos="zoom-in-up" className="w-full lg:max-w-[980px] transform overflow-hidden relative rounded-2xl bg-white px-4 py-8 lg:p-[50px] text-left align-middle shadow-xl transition-all">
                  <div className="absolute right-4 top-4 cursor-pointer" onClick={toShow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 12 12">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.7727 1.32466C11.8448 1.25269 11.902 1.16724 11.941 1.07318C11.98 0.979112 12.0001 0.878283 12.0002 0.776444C12.0003 0.674605 11.9803 0.573751 11.9413 0.47964C11.9024 0.38553 11.8454 0.300005 11.7734 0.22795C11.7014 0.155894 11.616 0.0987197 11.5219 0.0596898C11.4279 0.0206599 11.327 0.00053926 11.2252 0.000476667C11.1233 0.000414074 11.0225 0.0204108 10.9284 0.059325C10.8343 0.0982392 10.7487 0.155309 10.6767 0.227275L6 4.90396L1.32466 0.227275C1.17914 0.0817533 0.981767 -1.53333e-09 0.775968 0C0.570168 1.53332e-09 0.372798 0.0817533 0.227276 0.227275C0.0817534 0.372798 1.53333e-09 0.570168 0 0.775967C-1.53332e-09 0.981767 0.0817534 1.17914 0.227276 1.32466L4.90396 6L0.227276 10.6753C0.15522 10.7474 0.0980629 10.8329 0.0590669 10.9271C0.0200709 11.0212 0 11.1221 0 11.224C0 11.3259 0.0200709 11.4268 0.0590669 11.521C0.0980629 11.6151 0.15522 11.7007 0.227276 11.7727C0.372798 11.9182 0.570168 12 0.775968 12C0.877869 12 0.978773 11.9799 1.07292 11.9409C1.16706 11.9019 1.2526 11.8448 1.32466 11.7727L6 7.09603L10.6767 11.7727C10.8222 11.9181 11.0195 11.9996 11.2252 11.9995C11.4309 11.9994 11.6281 11.9176 11.7734 11.772C11.9187 11.6265 12.0003 11.4292 12.0002 11.2236C12.0001 11.0179 11.9182 10.8207 11.7727 10.6753L7.09604 6L11.7727 1.32466Z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-y-6 lg:gap-y-10">
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="font-['Raleway',sans-serif] text-center font-bold text-xl lg:text-[32px] leading-[120%] text-[#070809] mb-[20px]"
                      >
                        {t('bidHelpTitle')}
                      </Dialog.Title>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
                        {helperData.map((chip) => {
                          return (
                            <div
                              key={chip.id}
                              onClick={() => {
                                initToHelper(chip.text);
                              }}
                              className={`${activeChip.find((item) => item === chip.text) ? `${styles.active}` : 'hover:bg-transparent hover:border-[#070809] hover:text-[#070809]'} bg-[#F1F1F1] border border-[#f1f1f1] text-[#616161] py-3 px-4 w-full rounded-full text-center cursor-pointer`}
                            >
                              <p className="font-['Gilroy',sans-serif] text-xs lg:text-xl leading-[100%]">
                                {chip.text}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="font-['Raleway',sans-serif] text-center font-bold text-xl lg:text-[32px] leading-[120%] text-[#070809] mb-[20px]"
                      >
                        {t('bidPlatformsTitle')}
                      </Dialog.Title>
                      <div className="flex items-center gap-x-[10px] w-full">
                        {platformData.map((chip) => {
                          return (
                            <div
                              key={chip.id}
                              onClick={() => {
                                initToPlatform(chip.text);
                              }}
                              className={`${activePlatform.find((item) => item === chip.text) ? styles.active : 'hover:bg-transparent hover:border-[#070809] hover:text-[#070809]'} bg-[#F1F1F1] border border-[#f1f1f1] text-[#616161] py-3 w-full rounded-full text-center cursor-pointer`}
                            >
                              <p className="font-['Gilroy',sans-serif] text-xs lg:text-xl leading-[100%]">
                                {chip.text}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-2">
                      <div className="flex flex-col md:flex-row gap-y-2 gap-x-4">
                        <TextField
                          id="name"
                          name="name"
                          type="text"
                          isError={nameErr}
                          placeholder={t('bidForms.0')}
                          inputChange={handleNameChange}
                        />
                        <TextField
                          id="email"
                          name="email"
                          type="email"
                          isError={mailErr}
                          placeholder={t('bidForms.1')}
                          inputChange={handleMailChange}
                        />
                      </div>
                      <div className="flex flex-col md:flex-row gap-y-2 gap-x-4">
                        <TextField
                          id="company"
                          name="company"
                          type="text"
                          isError={companyErr}
                          placeholder={t('bidForms.2')}
                          inputChange={handleCompanyChange}
                        />
                        <TextField
                          id="phone"
                          name="phone"
                          type="tel"
                          isError={phoneErr}
                          placeholder={t('bidForms.3')}
                          inputChange={handlePhoneChange}
                        />
                      </div>
                      <div>
                        <TextArea
                          isError={taskErr}
                          placeholder={t('bidForms.4')}
                          inputChange={handleTaskChange}
                        />
                      </div>
                      <div>
                        <InputFile
                          placeholder={t('bidForms.5')}
                          changeFile={handleFileChange}
                        />
                      </div>
                    </div>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="font-['Raleway',sans-serif] text-center font-bold text-xl lg:text-[32px] leading-[120%] text-[#070809] mb-[20px]"
                      >
                        {t('bidAboutTitle')}
                      </Dialog.Title>
                      <div className="flex justify-center">
                        <div className="flex flex-wrap justify-center max-w-[700px] items-center gap-[10px] w-full">
                          {aboutData.map((chip) => {
                            return (
                              <div
                                key={chip.id}
                                onClick={() => {
                                  initToAbout(chip.text);
                                }}
                                className={`${activeAbout.find((item) => item === chip.text) ? styles.active : 'hover:bg-transparent hover:border-[#070809] hover:text-[#070809]'} bg-[#F1F1F1] border border-[#f1f1f1] text-[#616161] py-3 px-4 md:px-6 rounded-full text-center cursor-pointer`}
                              >
                                <p className="font-['Gilroy',sans-serif] text-xs lg:text-xl leading-[100%]">
                                  {chip.text}
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <button
                        onClick={sendForm}
                        className="font-['Gilroy',sans-serif] font-bold text-white bg-[#0046FA] rounded-full py-4 lg:py-[30px] w-full max-w-[276px] border border-[#0046FA] text-sm lg:text-xl hover:bg-transparent hover:border-[#070809] hover:text-[#070809]"
                      >
                        {t('send')}
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export type { Props as ModalFormProps };
export default ModalForm;
