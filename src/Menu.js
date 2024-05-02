import React from 'react';
import './App.css';

function Menu() {
  return (
    <div className="navigation">
		<div className="container">
			<nav className="navbar navbar-default">
				
				<div className="navbar-header nav_2">
					<button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
						<span className="sr-only">Toggle navigation</span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
						<span className="icon-bar"></span>
					</button>
				</div> 
				<div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
					<ul className="nav navbar-nav">
						<li className="act" ><a href="/" >Home</a></li>	
						
						<li className="act">
							<a href="#" >Top Offers </a>
						</li>
						 
						  <li className="dropdown">
							  <a href="#" className="dropdown-toggle">Category <b className="caret"></b></a>
						   <div className="dropdown-content">
								<a href="#">MEN</a>
								<a href="#">Women</a>
								<a href="#">Kids</a>
								
							</div>
						  </li>
						  
						  <li className="dropdown">
							  <a href="#" className="dropdown-toggle" data-toggle="dropdown">MEN <b className="caret"></b></a>
							  <div className="dropdown-content">
							  <a href="#">Shirts</a>
								<a href="#">T-Shirts</a>
								<a href="#">Blazers</a>
								<a href="#">Jeans</a>
								<a href="#">Mobiles</a>
								<a href="#">Shoes</a>
							</div>
						  </li>
						  <li className="dropdown">
							  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Women<b className="caret"></b></a>
							  <div className="dropdown-content">
							  <a href="#">Shirts</a>
								<a href="#">T-Shirts</a>
								<a href="#">Blazers</a>
								<a href="#">Jeans</a>
								<a href="#">Mobiles</a>
								<a href="#">Shoes</a>
								</div>
						  </li>
						  <li className="dropdown">
							  <a href="#" className="dropdown-toggle" data-toggle="dropdown">Kids <b className="caret"></b></a>
							  <div className="dropdown-content">
							  <a href="#">Shirts</a>
								<a href="#">T-Shirts</a>
								<a href="#">Blazers</a>
								<a href="#">Jeans</a>
								<a href="#">Mobiles</a>
								<a href="#">Shoes</a>
								</div>
						</li>  
						{/* <li><a href="mail.html">Mail Us</a></li> */}
					</ul>
				</div>
			</nav>
		</div>
	</div>
  );
}

export default Menu;
