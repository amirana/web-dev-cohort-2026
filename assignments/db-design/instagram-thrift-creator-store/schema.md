# Entity Relationship Diagram

## Instagram Thrift Creator Store

```txt

customers [icon: user, color: blue] {
  customer_id varchar(50) pk
  full_name varchar(100) not null
  email varchar(322) unique not null
  phone_number varchar(15) not null
  country varchar(50) not null
  house_no varchar(50) not null
  area varchar(255) not null
  landmark varchar(255)
  city varchar(50) not null
  pincode int(10) not null
  state varchar(50) not null
}

products [icon:shopping-bag, color: orange] {
  product_id varchar(50) pk
  type ENUM('thrifted', 'handmade') not null
  name varchar(150) not null
  price decimal(10, 2) not null
  size ENUM('XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL') not null
  color varchar(50) not null
  condition ENUM('new', 'like_new', 'very_good', 'good', 'satisfactory')
  material varchar(100) not null
  brand varchar(50) 
  category ENUM('men', 'women', 'kids') not null
  description text
  image_url varchar(255)
}

thrifted_products [icon: shirt, color: orange] {
  thrifted_id serial pk
  product_id varchar(50) fk
  status enum('available', 'sold', 'reserved')
}

handmande_products [icon: shirt, color: orange] {
  handmande_id serial pk
  product_id varchar(50) fk
  quantity_available int not null
}

orders [icon: shopping-cart, color: green] {
  order_id varchar(50) pk
  customer_id varchar(50) fk
  source enum('instagram', 'whatsApp')
  order_status enum('order_received', 'pending', 'order_confirmed', 'shipped', 'delivered', 'cancelled')
  shipping_id varchar(50) fk
  payment_id varchar(100) fk
  created_at timestamp
}

order_items [icon: shopping-cart, color: green] {
  order_item_id serial pk
  order_id varchar(50) fk
  product_id varchar(50) fk
  quantity int
}

payments [icon: credit-card, color: yellow] {
  payment_id varchar(100) pk
  order_id varchar(50) fk
  payment_mode enum('upi', 'card', 'cod', 'bank_transfer')
  status enum('pending', 'paid', 'failed')
  date timestamp
}

shipping [icon: truck, color: black] {
  shipping_id varchar(50) pk
  order_id varchar(50) fk
  status enum('preparing', 'dispatched', 'on_the_way', 'delivered')
  tracking_id varchar(100)
  logistic_provider varchar(100)
  dispacted_date timestamp
  delivered_date timestamp
}

customers.customer_id < orders.customer_id
orders.order_id < order_items.order_id
products.product_id < thrifted_products.product_id
products.product_id < handmande_products.product_id
orders.order_id - shipping.shipping_id
orders.order_id - payments.payment_id
products.product_id < order_items.product_id


```