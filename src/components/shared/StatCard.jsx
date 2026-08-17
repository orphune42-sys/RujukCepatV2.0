import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { slideUp } from '../../utils/animations';

export default function StatCard({ stats, gridClassName = 'grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-6', cardClassName, titleClassName = 'text-sm font-medium leading-5 text-gray-500', valueClassName = 'text-2xl font-bold text-gray-900' }) {
  return (
    <div className={gridClassName}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div key={index} variants={slideUp}>
            <Card hover={!cardClassName} className={cardClassName}>
              <CardContent className="flex min-w-0 items-center gap-4 p-5">
                <div className={`shrink-0 p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div className="min-w-0">
                  <p className={titleClassName}>{stat.title}</p>
                  <h3 className={valueClassName}>{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
