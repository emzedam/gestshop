<template>
    <!-- Begin Page Content -->
    <div class="container-fluid">
      <!-- Page Heading -->
  
      <!-- DataTales Example -->
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="m-0 font-weight-bold text-primary">
            درخواست های رد شده
          </h6>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table
              class="table table-bordered"
              id="dataTable"
              width="100%"
              cellspacing="0"
            >
              <thead>
                <tr>
                  <th>نام ونام خوانوادگی</th>
                  <th>کدملی</th>
                  <th>شماره موبایل</th>
                  <th>کالای درخواستی</th>
                  <th>آدرس</th>
                  <th>جزئیات</th>
                </tr>
              </thead>
  
              <tbody>
                <tr>
                  <td>محبوب حسین زاده</td>
                  <td>279000000</td>
                  <td>09121234567</td>
                  <td>موبایل</td>
                  <td>خوی میدان ولیعصر</td>
                  <td><router-link to="/admin/details/1">جزئیات بیشتر</router-link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- /.container-fluid -->
  </template>
  
  <script setup></script>
  
  <style scoped>
  @import url("../../assets/css/sb-admin-2.min.css");
  </style>
  