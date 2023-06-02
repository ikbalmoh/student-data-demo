'use client';

import React, { FormEvent, FormEventHandler, useState } from 'react';
import data from '@/data/students.json';
import { Student } from '@/types/student';
import classNames from '@/utils/classNames';

type Props = {
  onPickHandler: (ids: number[]) => void;
  loading: boolean;
};

export default function StudentsPicker({ onPickHandler, loading }: Props) {
  const students: Pick<Student, 'id' | 'name' | 'schoolId'>[] = data;

  const [selected, setSelected] = useState<number[]>([]);

  const onSelectStudent = (id: number) => {
    let ids = [...selected];
    if (ids.includes(id)) {
      ids = ids.filter((i) => i !== id);
    } else {
      ids.push(id);
    }

    setSelected(ids);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPickHandler(selected);
  };

  return (
    <div className="col-span-12 md:col-span-4 xl:col-span-3">
      <form className="bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
        <div className="px-5 py-3 font-semibold text-slate-900">
          Pick Students
        </div>
        <div className="border-t border-slate-200/60">
          {students.map((student) => (
            <button
              key={student.id}
              type="button"
              className={classNames(
                'flex flex-row items-center hover:bg-slate-100 transition-all w-full px-5 py-2.5 rounded-lg border-b border-slate-50',
                selected.includes(student.id)
                  ? 'font-medium text-indigo-500 bg-slate-50'
                  : 'font-normal'
              )}
              onClick={() => onSelectStudent(student.id)}
            >
              <div
                className={classNames(
                  'w-5 h-5 mr-3 rounded-md transition-all',
                  selected.includes(student.id)
                    ? 'bg-indigo-400'
                    : 'bg-gray-200'
                )}
              ></div>
              <div className="flex-1 text-left">
                <div>{student.name}</div>
                <div className="text-xs text-slate-500">
                  schoolId: {student.schoolId}
                </div>
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-end items-start p-5">
          <button
            className="px-4 py-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-700 hover:text-white transition-all rounded-lg font-medium disabled:bg-gray-100 disabled:text-gray-600"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Filter'}
          </button>
        </div>
      </form>
    </div>
  );
}
