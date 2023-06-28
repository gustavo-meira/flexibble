"use client";

import { SessionInterface } from '@/common.types';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';

type MenuItemLinkProps = {
  href: string;
  text: string;
};

const MenuItemLink = ({ href, text }: MenuItemLinkProps) => (
  <Menu.Item>
    <Link href={href} className="text-sm">{text}</Link>
  </Menu.Item>
);

type ProfileMenuProps = {
  session: SessionInterface;
};

export const ProfileMenu = ({ session }: ProfileMenuProps) => {
  const [openModal, setOpenModal] = useState(false);

  console.log(session.user.image);

  return (
    <div className="flexCenter z-10 flex-col relative">
      <Menu as="div">
        <Menu.Button className="flexCenter" onMouseEnter={() => setOpenModal(true)}>
          {session.user?.image && (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              className="rounded-full"
              alt="User profile image"
            />
          )}
        </Menu.Button>

        <Transition
          show={openModal}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="flexStart profile_menu-items"
            onMouseLeave={() => setOpenModal(false)}
          >
            <div className="flex flex-col items-center gap-y-4">
              {session.user?.image && (
                <Image
                  src={session.user.image}
                  className="rounded-full"
                  width={80}
                  height={80}
                  alt="profile Image"
                />
              )}
              <p className="font-semibold">{session.user.name}</p>
            </div>
            <div className="flex flex-col gap-3 pt-10 items-start w-full">
              <MenuItemLink href={`/profile/${session.user.id}`} text="Work Preferences" />
              <MenuItemLink href={`/profile/${session.user.id}`} text="Settings" />
              <MenuItemLink href={`/profile/${session.user.id}`} text="Profile" />
            </div>
            <div className="w-full flexStart border-t border-nav-border mt-5 pt-5">
              <Menu.Item>
                <button type="button" className="text-sm" onClick={() => signOut()}>
                  Sign Out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
