import React from 'react'
import SchedulerCalendar from 'scheduler-calendar'
import 'scheduler-calendar/dist/index.css'
export default function Calendar() {
  return (
    <div>
      <SchedulerCalendar
              availabilities={[
                {
                  day: "06/09/2021",
                  slots: [
                    {Animation},
                    {from: '11:30', to: '19:00'},
                  ]
                },
              ]}
              availabilityType={'infinity'}
              duration={10}
              onIntervalChange={() => {}}
            />
    </div>
  )
}

