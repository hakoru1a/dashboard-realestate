import appointmentApi from "apis/apointment.api";
import useAuth from "hooks/useAuth";
import { useEffect, useState } from "react";
import { getNextMonday } from "../../utils/utils";
import "./custom.css";
// interface TimeSlot {
//   slot: number;
//   isActive: boolean;
//   property?: Property;
// }
function TimeTable() {
  const [myAppointments, setMyAppointments] = useState();
  const user = useAuth();
  useEffect(() => {
    appointmentApi.getMyAppointment(user?.id).then((res) => {
      console.log(res.data.data);
      setMyAppointments(res.data.data);
    });
  }, []);
  //   const { data, isFetching } = useQuery({
  //     queryFn: () => appointmentApi.getMyAppointment(user.id),
  //     queryKey: ["appointments", user.id],
  //   });

  // Tạo một mảng 2 chiều để biểu diễn bảng lịch
  const tableData = Array(7)
    .fill(null)
    .map(() => Array(3).fill({ isActive: false, slot: -1 }));

  // Đặt các ô trong bảng tương ứng với lịch hẹn
  myAppointments?.forEach((appointment) => {
    const date = new Date(appointment.appointmentDate * 1000); // Chuyển đổi timestamp thành Date
    const dayOfWeek = date.getUTCDay(); // Lấy ngày trong tuần (0 là Chủ Nhật)
    const hours = date.getHours();

    // Xác định khoảng thời gian trong bảng dựa trên thời gian lịch hẹn
    let timeSlot = { isActive: false, slot: -1 };
    console.log(hours);

    if (hours >= 8 && hours < 10) {
      timeSlot = { slot: 0, isActive: false };
    } else if (hours >= 13 && hours < 15) {
      timeSlot = { slot: 1, isActive: false };
    } else if (hours >= 16 && hours < 18) {
      timeSlot = { slot: 2, isActive: false };
    }
    timeSlot = {
      ...timeSlot,
      isActive: appointment.user !== null,
      property: appointment.property,
    };

    if (timeSlot.slot !== -1) {
      let index;
      if (dayOfWeek === 0) {
        index = 6;
      } else {
        index = dayOfWeek - 1;
      }
      tableData[index][timeSlot.slot] = timeSlot; // Đánh dấu ô có lịch hẹn
    }
  });
  console.log(tableData);

  return (
    <div title={`My time: ${getNextMonday()}`}>
      <div className="timetable">
        <div className="week-names">
          <div>Monday</div>
          <div>Tuesday</div>
          <div>Wednesday</div>
          <div>Thursday</div>
          <div>Friday</div>
          <div className="weekend">Saturday</div>
          <div className="weekend">Sunday</div>
        </div>
        <div className="time-interval">
          <div>8:00 - 10:00</div>
          <div>13:00 - 15:00</div>
          <div>16:00 - 18:00</div>
        </div>
        <div className="content">
          {tableData.map((row, dayOfWeek) => (
            <div key={`row-${dayOfWeek}`} className="timetable-row ">
              {row.map((cell, timeSlot) => {
                return (
                  <div
                    key={`${dayOfWeek}-${timeSlot}`}
                    title={`${cell?.property ? cell.property.propertyName : "Không hợp lệ"}`}
                    className={`timetable-cell ${
                      cell.slot !== -1
                        ? cell.isActive
                          ? "accent-orange-gradient"
                          : "vacant-appointment"
                        : ""
                    }`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeTable;
