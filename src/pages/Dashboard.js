import React,{useState,useEffect} from 'react'
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import api from "../api"
import DateFilter from "../components/DateFilter";
import { months } from "../components/DateFilter/DateFilterData";


function Dashboard() {
  const today = new Date();
  const colors =["#cb2d3e","#E0332B","#E34942","#E7605A","#EA7771","#EE8E89","#F1A4A1","#F5BBB8","#F8D2D0","#FCE8E7"]
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setcurrentYear] = useState(today.getFullYear());
  const [categoryChartData, setCategoryChartData] = useState([]);
  const [groupChartData, setGroupChartData] = useState([]);

  const getCategoryChart = async () => {
    const daysInMonth = months[currentMonth].days;
    const monthNumber = months[currentMonth].number;
    const response = await api.get(`/chart/category?startDate=${currentYear}-${monthNumber}-01&endDate=${currentYear}-${monthNumber}-${daysInMonth}`);
    setCategoryChartData(response.data);
  };

  const getGroupChart = async () => {
    const daysInMonth = months[currentMonth].days;
    const monthNumber = months[currentMonth].number;
    const response = await api.get(`/chart/group?startDate=${currentYear}-${monthNumber}-01&endDate=${currentYear}-${monthNumber}-${daysInMonth}`);
    setGroupChartData(response.data);
  };

  useEffect(()=>{
    getCategoryChart();
    getGroupChart();
  },[currentMonth, currentYear])

  const handleMonthChange = (event) => {
    setCurrentMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setcurrentYear(event.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="twelve columns">
          <DateFilter
            currentMonth={currentMonth}
            currentYear={currentYear}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
        </div>
        <div className="one-third column"></div>
      </div>
      <div className="row">
        <div className="six columns">
        <BarChart
        width={500}
        height={600}
        data={categoryChartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" unit="€" name="Amount" fill={colors[0]}>
        {
          categoryChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]}  strokeWidth={index === 2 ? 4 : 1}/>
          ))
        }
        </Bar>
      </BarChart>
        </div>
        <div className="six columns">
        <BarChart
        width={500}
        height={600}
        data={groupChartData}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" unit="€" name="Amount" fill={colors[0]}>
        {
          categoryChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index]}  strokeWidth={index === 2 ? 4 : 1}/>
          ))
        }
        </Bar>
      </BarChart>
        </div>
         
    </div>
    </div>
  )
}

export default Dashboard
