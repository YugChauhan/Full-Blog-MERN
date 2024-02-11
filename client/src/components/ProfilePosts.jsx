import React from 'react'
import { IF } from '../url';
function ProfilePosts({p,date}) {
    return (
        <div className="mb-10 overflow-hidden rounded shadow-md">
          <img src={IF + p.photo} alt="" className="w-full h-64 object-cover" />
          <div className="p-6">
            {date && (
              <span className="inline-block mb-5 px-4 py-1 text-xs font-semibold leading-loose text-white bg-primary rounded">
                {date}
              </span>
            )}
            <h3>
              <a
                href="/#"
                className="block mb-4 text-2xl font-semibold text-dark hover:text-primary dark:text-white"
              >
                {p.title}
              </a>
            </h3>
            <p className="mb-3 text-body-color dark:text-dark-6">{p.desc.slice(0,200)+" ...Read more"}</p>
            <div className="flex items-center space-x-6 text-base text-body-color dark:text-dark-6">
              <p className="font-bold font-serif">{p.username}</p>
              <p className="font-bold font-serif">22 Dec 2023 </p>
            </div>
          </div>
        </div>
      );
}

export default ProfilePosts