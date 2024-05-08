"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import SignaturePad from "react-signature-canvas";
import SignatureCanvas from "react-signature-canvas";
import Canvas from "../../components/canvas";

export default function Home() {
  return (
    
    <div className="flex bg-gray-100 text-gray-900">
      <aside className="flex h-screen w-20 flex-col items-center border-r border-gray-200 bg-white">
      <nav className="flex flex-1 flex-col gap-y-4 pt-8">
        <button className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>

          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Lapiz <span className="text-gray-400">(Y)</span>
            </div>
          </div>
        </button>

        <button className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="currentColor" d="m16.24 3.56l4.95 4.94c.78.79.78 2.05 0 2.84L12 20.53a4.01 4.01 0 0 1-5.66 0L2.81 17c-.78-.79-.78-2.05 0-2.84l10.6-10.6c.79-.78 2.05-.78 2.83 0M4.22 15.58l3.54 3.53c.78.79 2.04.79 2.83 0l3.53-3.53l-4.95-4.95z"></path></svg>

          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Borrador <span className="text-gray-400">(Y)</span>
            </div>
          </div>
        </button>

        <button className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
</svg>

          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Pincel <span className="text-gray-400">(Y)</span>
            </div>
          </div>
        </button>

        <button className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 20 20"><path fill="currentColor" d="M9 2.5a.5.5 0 0 0-1 0V4c-.205.072-.397.19-.56.354L2.353 9.439a1.5 1.5 0 0 0 0 2.122l4.335 4.335a1.5 1.5 0 0 0 2.122 0l5.085-5.085a1.5 1.5 0 0 0 0-2.122L9.561 4.354A1.5 1.5 0 0 0 9 4zM8 5.207V6.5a.5.5 0 0 0 1 0V5.207l4.19 4.19a.5.5 0 0 1 .079.603H3.207zm-.604 9.982L3.207 11h9.086l-4.19 4.19a.5.5 0 0 1-.707 0m8.62-3.797a.597.597 0 0 0-1.032 0l-1.652 2.833C12.355 15.898 13.562 18 15.5 18c1.937 0 3.145-2.102 2.168-3.775zm-1.82 3.337l1.304-2.237l1.305 2.237a1.51 1.51 0 1 1-2.61 0"></path></svg>

          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Rellenar <span className="text-gray-400">(Y)</span>
            </div>
          </div>
        </button>

        <button className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 16 16"><path fill="currentColor" fillRule="evenodd" d="M8 1.003a7 7 0 0 0-7 7v.43c.09 1.51 1.91 1.79 3 .7a1.87 1.87 0 0 1 2.64 2.64c-1.1 1.16-.79 3.07.8 3.2h.6a7 7 0 1 0 0-14zm0 13h-.52a.58.58 0 0 1-.36-.14a.56.56 0 0 1-.15-.3a1.24 1.24 0 0 1 .35-1.08a2.87 2.87 0 0 0 0-4a2.87 2.87 0 0 0-4.06 0a1 1 0 0 1-.9.34a.4.4 0 0 1-.22-.12a.42.42 0 0 1-.1-.29v-.37a6 6 0 1 1 6 6zM9 3.997a1 1 0 1 1-2 0a1 1 0 0 1 2 0m3 7.007a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-7-5a1 1 0 1 0 0-2a1 1 0 0 0 0 2m7-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0M13 8a1 1 0 1 1-2 0a1 1 0 0 1 2 0" clipRule="evenodd"></path></svg>

          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Paleta de Colores<span className="text-gray-400">(Y)</span>
            </div>
          </div>
        </button>

        <button className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>

          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Figuras<span className="text-gray-400">(Y)</span>
            </div>
          </div>
        </button>

        <button className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50">
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path><path fill="currentColor" d="M6.798 2.884a7.002 7.002 0 0 1 9.294 8.565l4.394 3.718a3.76 3.76 0 1 1-5.3 5.3l-3.717-4.394a7.002 7.002 0 0 1-8.565-9.295c.358-.894 1.48-1.007 2.063-.373L8.17 9.883l1.446-.288l.29-1.449l-3.48-3.198c-.634-.583-.522-1.706.373-2.064ZM8.805 4.42l2.763 2.54c.322.296.466.738.38 1.165l-.47 2.354a1.25 1.25 0 0 1-.982.981l-2.35.467a1.25 1.25 0 0 1-1.164-.38L4.438 8.785a5.002 5.002 0 0 0 6.804 5.25a1.257 1.257 0 0 1 1.422.355l4.05 4.786a1.76 1.76 0 1 0 2.48-2.48l-4.785-4.05a1.257 1.257 0 0 1-.355-1.422a5.001 5.001 0 0 0-5.25-6.804Z"></path></g></svg>

          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
            <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
              <div className="absolute inset-0 -left-1 flex items-center">
                <div className="h-2 w-2 rotate-45 bg-white"></div>
              </div>
              Red Neuronal<span className="text-gray-400">(Y)</span>
            </div>
          </div>
        </button>
        </nav>

        <nav className="flex flex-1 flex-col gap-y-4 pt-8">

          <a
            href="#"
            className="group relative rounded-xl bg-gray-100 p-2 text-blue-600 hover:bg-gray-50"
          >
            <svg
              className="h-6 w-6 stroke-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 9V15M9 12H15H9Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
              <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                  <div className="h-2 w-2 rotate-45 bg-white"></div>
                </div>
                Layouts <span className="text-gray-400">(Y)</span>
              </div>
            </div>
          </a>

          
        </nav>

        <div className="flex flex-col items-center gap-y-4 py-10">
          <button className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 15 15"><path fill="#216afd" fillRule="evenodd" d="m6.007 13.418l2-12l.986.164l-2 12zm-.8-8.918l-3 3l3 3l-.707.707L.793 7.5L4.5 3.793zm5.293-.707L14.207 7.5L10.5 11.207l-.707-.707l3-3l-3-3z" clipRule="evenodd"></path></svg>
          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
              <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                  <div className="h-2 w-2 rotate-45 bg-white"></div>
                </div>
                Compilador <span className="text-gray-400">(Y)</span>
              </div>
            </div>
          </button>
        </div>

        <div className="flex flex-col items-center gap-y-4 py-10"> 
        <button className="group relative rounded-xl p-2 text-gray-400 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="black" fillRule="evenodd" d="M5 5h4.5v4.5H5zm1.5 1.5V8H8V6.5zm8-1.5H19v4.5h-4.5zM16 6.5V8h1.5V6.5zm-11 8h4.5V19H5zM6.5 16v1.5H8V16z" clipRule="evenodd"></path><path fill="black" d="M5 11.25h1.5v1.5H5zm3 0h1.5v1.5H8zm3.167 0h1.5v1.5h-1.5zm0 3.125h1.5v1.5h-1.5zm0 3.125h1.5V19h-1.5zm0-9.375h1.5v1.5h-1.5zm0-3.125h1.5v1.5h-1.5zm3.166 6.25h1.5v1.5h-1.5zm3.167 0H19v1.5h-1.5zm-3.167 3.125h1.5v1.5h-1.5zm3.167 0H19v1.5h-1.5zM14.333 17.5h1.5V19h-1.5zm3.167 0H19V19h-1.5z"></path></svg>
          <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
              <div className="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                <div className="absolute inset-0 -left-1 flex items-center">
                  <div className="h-2 w-2 rotate-45 bg-white"></div>
                </div>
                QR <span className="text-gray-400">(Y)</span>
              </div>
            </div>
          </button>
        </div>

      </aside>

      <div className="Canvas">
            <Canvas />
        </div>

    </div>

  
    
  );

}
