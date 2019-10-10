# Database Queries

### Display the ProductName and CategoryName for all products in the database. Shows 76 records.
select p.productname, c.categoryname 
from products as p
join categories as c 
on p.categoryid = c.categoryid;

### Display the OrderID and ShipperName for all orders placed before January 9, 1997. Shows 161 records.
select o.orderid, s.shippername 
from orders as o
join shippers as s
on o.shipperid = s.shipperid
where orderdate < '1997-01-09';

### Display all ProductNames and Quantities placed on order 10251. Sort by ProductName. Shows 3 records.
select p.productname, od.orderid, od.quantity
from products as p
join orderdetails as od
on p.productid = od.productid
where od.orderid = 10251
order by p.productname;

### Display the OrderID, CustomerName and the employee's LastName for every order. All columns should be labeled clearly. Displays 196 records.
select o.orderid as [Order Id], c.customername as [Customer Name], e.lastname as [Employee Last Name] from orders as o
join customers as c
on o.customerid = c.customerid
join employees as e
on o.employeeid = e.employeeid;

### (Stretch)  Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 9 records.
select p.productname, c.categoryname, count(c.categoryid) as [Count]
from products as p
join categories as c
on p.categoryid = c.categoryid
group by p.categoryid;

### (Stretch) Display OrderID and a  column called ItemCount that shows the total number of products placed on the order. Shows 196 records. 

--THIS ONE SHOWS THE TOTAL PRODUCT QUANTITY ON EACH ORDER
select od.orderid, sum(quantity) as [ItemCount]
from orderdetails as od
group by od.orderid;

OR

--THIS ONE SHOWS THE NUMBER OF PRODUCT TYPES ON EACH ORDER
select od.orderid, count(productid) as [ItemCount]
from orderdetails as od
group by od.orderid;