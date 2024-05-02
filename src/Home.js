
import React, { useEffect, useState } from 'react';
import './App.css';
import Menu from './Menu';
import {httpPost,httpPostwithToken} from './HttpConfig';
import {CartContextValue} from './ContextProvider';
import { Link } from 'react-router-dom';
import SimpleImageSlider from "react-simple-image-slider";

function Home() {
	// const [sign_in_up_model,setsignin_up_model] = useState('')
	// const[mobile,setMobile] = useState('');
	// const[password,setPassword] = useState('');
	// const[respassword,setRePassword] = useState('');
	const [categoryList,setCategoryList] = useState([]);
	const [productList,setProductList] = useState([]);
	const [cartData,dispatch] = CartContextValue()
	useEffect(()=>{
		//TODO check user login
		getCategory();
		getCartApi()
	},[])
	// const signUpApi=()=>{
	// 	if(mobile == ""){
	// 		alert("Mobile should not be empty");
	// 		return;
	// 	}else if(name == ""){
	// 		alert("Name should not be empty");
	// 		return;
	// 	}else if(email == ""){
	// 		alert("Email should not be empty");
	// 		return;
	// 	}else if(password == ""){
	// 		alert("password should not be empty");
	// 		return;
	// 	}else if(respassword == ""){
	// 		alert("Repassword should not be empty");
	// 		return;
	// 	}else if(password == respassword){
	// 		alert("Password and Repassword should be same");
	// 		return;
	// 	}
	// 	let jsonOBj ={ 
	// 			"name":name,
	// 			"mobile":mobile,
	// 			"password":password ,
	// 			"email":email
	// 		}
				
	// 	httpPost("signup/user",jsonOBj)
	// 	.then(res => res.json())
	// 	.then((res)=>{
	// 		if(res.hasOwnProperty('id')){
	// 			alert("Registration success.please sign in");
	// 			setMobile('');
	// 			setPassword('');
	// 			setRePassword("");
	// 			setEmail("")
	// 			setName('');
	// 			setsignin_up_model('sign-in')//hide the SIGNUP model.
	// 		}else{
	// 			alert(res['message']);	
	// 		}
			
	// 		//console.log(res);
			
	// 	},error=>{
	// 		alert(error.message);
	// 	}
	// 	)
	// }
	const getCartApi = ()=>{		
		httpPostwithToken("addtocart/getCartsByUserId",{})
		.then((res)=>{				
			res.json() .then(data=>{
				if(res.ok){
					dispatch({
						"type":"add_cart",
						"data":data
					})
					//alert("Successfully added..")
				}else{
					alert(data.message)
				}
			})
		},error=>{
			alert(error.message);
		}
		)
	}
	const addCartApi=(productObj)=>{
		let obj = {
			"productId":productObj.id,			
			"qty":"1",
			"price":productObj.price
			
		}
		httpPostwithToken("addtocart/addProduct",obj)
		.then((res)=>{		
			res.json() .then(data=>{
				if(res.ok){
					dispatch({
						"type":"add_cart",
						"data":data
					})
					alert("Successfully added..")
				}else{
					alert(data.message)
				}
			})     
		}).catch(function(res){
			console.log("Error ",res);
			//alert(error.message);
		}
		)
	}
	const getCategory = ()=>{
		httpPostwithToken("product/getAllCategory",{}).
		then((res)=>{
			res.json().then(response=>{
				if(res.ok){
					setCategoryList(response);
					getProductsByCategory(response[0].id);
				}else{
					alert("Error in category api..")
				}
			})
			
			
		})
	}
	const getProductsByCategory = (cat_id)=>{
		let obj = {
			"cat_id":cat_id
		}
		
		httpPostwithToken("product/getProductsByCategory",obj)
		.then((res)=>{
			res.json().then(response=>{
				if(res.ok){
					if(response.length > 0){
						setProductList(response)
					}else{
						alert("No product found..");	
					}
				}else{
					setProductList([])
					alert("No product found..");
				}
			})
		},error=>{
			alert(error.message);
		}
		)
	}
	// const addCart=(productObj)=>{
	// 	//TODO Add cart implementation..
	// 	console.log(productObj)
	// }
	// const loginApi = ()=>{
	// 	if(mobile == ""){
	// 		alert("Mobile should not be empty");
	// 		return;
	// 	}else if(password == ""){
	// 		alert("password should not be empty");
	// 		return;
	// 	}
	// 	let jsonOBj = {"mobile":mobile,"password":password }
		
	// 	httpPost("login/user",jsonOBj)
	// 	.then(res => res.json())
	// 	.then((res)=>{
	// 		if(res['token'] != null){
	// 			localStorage.setItem("token",res['token']);//token
	// 			localStorage.setItem("user_id",res['user_profile_details']['user_id']);//user_id
	// 			setsignin_up_model('')//hide the SIGNUP model.
	// 			getCategory();
	// 		}else{
	// 			alert(res['message']);	
	// 		}
			
	// 		//console.log(res);
			
	// 	},error=>{
	// 		alert(error.message);
	// 	}
	// 	)
	// }
  return (
    <div>
   	

  <div className="banner">
		<div className="container">
			<h3>Shopping Mall, <span>Special Offers</span></h3>
		</div>
		
	</div>

	<div className="banner-bottom">
		<div className="container">
			
				  
      <div className=" wthree_banner_bottom_right">
				<div className="bs-example bs-example-tabs" role="tabpanel" data-example-id="togglable-tabs">
					
					<ul id="myTab" className="nav nav-tabs" role="tablist">
						{
							categoryList.map((category)=>(
								<li  onClick={(e)=>getProductsByCategory(category.id)} key={category.id} role="presentation">
									<a href="javascript:void(0)">{category.name}</a>
								</li>
							))
						}
						<li>
							<div className="input-group">
								<div className="form-outline">
									<input id="search-input" type="search" placeholder='Search..' className="form-control" />
									<label className="form-label" for="f"></label>
									<button id="search-button" type="button" className="btn btn-primary">
									Search</button>
								</div>
							</div>
						</li>
						
					</ul>
					<div id="myTabContent" className="tab-content">
						<div role="tabpanel" className="tab-pane fade active in" id="home" aria-labelledby="home-tab">
							
							<div className="agile_ecommerce_tabs">
								
							{
									productList.map((product)=>(

										<div className="col-md-3 agile_ecommerce_tab_left">
											<div className="hs-wrapper">
												<img src={"../assets/images/" +  product.category_id + "1" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "1" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "1" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "1" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "1" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />

												<div className="w3_hs_bottom">
													<ul>
														<li>
															<a href="#" data-toggle="modal" data-target="#myModal">
																<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
														</li>
													</ul>
												</div>
											</div> 
											<h5>
											<Link to={"/product/"+product.id}>{product.name}</Link>

																						
											</h5>
											<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
											<div className="simpleCart_shelfItem">
												<p><i className="item_price">₹{product.price}</i></p>
											</div>
								       </div>
									))
								}
{
									productList.map((product)=>(

										<div className="col-md-3 agile_ecommerce_tab_left">
											<div className="hs-wrapper">
												<img src={"../assets/images/" +  product.category_id + "2" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "2" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "2" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "2" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "2" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />

												<div className="w3_hs_bottom">
													<ul>
														<li>
															<a href="#" data-toggle="modal" data-target="#myModal">
																<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
														</li>
													</ul>
												</div>
											</div> 
											<h5>
											<Link to={"/product/"+product.id}>{product.name}</Link>

																						
											</h5>
											<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
											<div className="simpleCart_shelfItem">
												<p><i className="item_price">₹{product.price}</i></p>
											</div>
								       </div>
									))
								}
{
									productList.map((product)=>(

										<div className="col-md-3 agile_ecommerce_tab_left">
											<div className="hs-wrapper">
												<img src={"../assets/images/" +  product.category_id + "3" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "3" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "3" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "3" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "3" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />

												<div className="w3_hs_bottom">
													<ul>
														<li>
															<a href="#" data-toggle="modal" data-target="#myModal">
																<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
														</li>
													</ul>
												</div>
											</div> 
											<h5>
											<Link to={"/product/"+product.id}>{product.name}</Link>

																						
											</h5>
											<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
											<div className="simpleCart_shelfItem">
												<p><i className="item_price">₹{product.price}</i></p>
											</div>
								       </div>
									))
								}
{
									productList.map((product)=>(

										<div className="col-md-3 agile_ecommerce_tab_left">
											<div className="hs-wrapper">
												<img src={"../assets/images/" +  product.category_id + "4" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "4" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "4" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "4" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "4" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />

												<div className="w3_hs_bottom">
													<ul>
														<li>
															<a href="#" data-toggle="modal" data-target="#myModal">
																<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
														</li>
													</ul>
												</div>
											</div> 
											<h5>
											<Link to={"/product/"+product.id}>{product.name}</Link>

																						
											</h5>
											<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
											<div className="simpleCart_shelfItem">
												<p><i className="item_price">₹{product.price}</i></p>
											</div>
								       </div>
									))
								}
{
									productList.map((product)=>(

										<div className="col-md-3 agile_ecommerce_tab_left">
											<div className="hs-wrapper">
												<img src={"../assets/images/" +  product.category_id + "5" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "5" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "5" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "5" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "5" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />

												<div className="w3_hs_bottom">
													<ul>
														<li>
															<a href="#" data-toggle="modal" data-target="#myModal">
																<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
														</li>
													</ul>
												</div>
											</div> 
											<h5>
											<Link to={"/product/"+product.id}>{product.name}</Link>

																						
											</h5>
											<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
											<div className="simpleCart_shelfItem">
												<p><i className="item_price">₹{product.price}</i></p>
											</div>
								       </div>
									))
								}
{
									productList.map((product)=>(

										<div className="col-md-3 agile_ecommerce_tab_left">
											<div className="hs-wrapper">
												<img src={"../assets/images/" +  product.category_id + "6" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "6" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "6" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "6" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "6" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />

												<div className="w3_hs_bottom">
													<ul>
														<li>
															<a href="#" data-toggle="modal" data-target="#myModal">
																<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
														</li>
													</ul>
												</div>
											</div> 
											<h5>
											<Link to={"/product/"+product.id}>{product.name}</Link>

																						
											</h5>
											<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
											<div className="simpleCart_shelfItem">
												<p><i className="item_price">₹{product.price}</i></p>
											</div>
								       </div>
									))
								}
{
									productList.map((product)=>(

										<div className="col-md-3 agile_ecommerce_tab_left">
											<div className="hs-wrapper">
												<img src={"../assets/images/" +  product.category_id + "7" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "7" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "7" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "7" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "7" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />

												<div className="w3_hs_bottom">
													<ul>
														<li>
															<a href="#" data-toggle="modal" data-target="#myModal">
																<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
														</li>
													</ul>
												</div>
											</div> 
											<h5>
											<Link to={"/product/"+product.id}>{product.name}</Link>

																						
											</h5>
											<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
											<div className="simpleCart_shelfItem">
												<p><i className="item_price">₹{product.price}</i></p>
											</div>
								       </div>
									))
								}
{
									productList.map((product)=>(

										<div className="col-md-3 agile_ecommerce_tab_left">
											<div className="hs-wrapper">
												<img src={"../assets/images/" +  product.category_id + "8" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "8" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "8" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "8" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "8" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />

												<div className="w3_hs_bottom">
													<ul>
														<li>
															<a href="#" data-toggle="modal" data-target="#myModal">
																<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
														</li>
													</ul>
												</div>
											</div> 
											<h5>
											<Link to={"/product/"+product.id}>{product.name}</Link>

																						
											</h5>
											<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
											<div className="simpleCart_shelfItem">
												<p><i className="item_price">₹{product.price}</i></p>
											</div>
								       </div>
									))
								}
{
									productList.map((product)=>(

										<div className="col-md-3 agile_ecommerce_tab_left">
											<div className="hs-wrapper">
												<img src={"../assets/images/" +  product.category_id + "9" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "9" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "9" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "9" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "9" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />

												<div className="w3_hs_bottom">
													<ul>
														<li>
															<a href="#" data-toggle="modal" data-target="#myModal">
																<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
														</li>
													</ul>
												</div>
											</div> 
											<h5>
											<Link to={"/product/"+product.id}>{product.name}</Link>

																						
											</h5>
											<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
											<div className="simpleCart_shelfItem">
												<p><i className="item_price">₹{product.price}</i></p>
											</div>
								       </div>
									))
								}
{
									productList.map((product)=>(

										<div className="col-md-3 agile_ecommerce_tab_left">
											<div className="hs-wrapper">
												<img src={"../assets/images/" +  product.category_id + "10" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "10" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "10" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "10" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />
												<img src={"../assets/images/" +  product.category_id + "10" + (Math.floor(Math.random()*5)+1).toString() + ".jpg"} alt=" " className="img-responsive" />

												<div className="w3_hs_bottom">
													<ul>
														<li>
															<a href="#" data-toggle="modal" data-target="#myModal">
																<span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a>
														</li>
													</ul>
												</div>
											</div> 
											<h5>
											<Link to={"/product/"+product.id}>{product.name}</Link>

																						
											</h5>
											<h5><a onClick={()=>addCartApi(product)} href="javascript:void(0)">Add Cart</a></h5>
											<div className="simpleCart_shelfItem">
												<p><i className="item_price">₹{product.price}</i></p>
											</div>
								       </div>
									))
								}
								
							</div>
						</div>
						
					</div>
					
					
				</div> 
			</div>
    </div>
    </div>

	
    </div>
  );
}

export default Home;
