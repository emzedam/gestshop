<template>

<ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <!-- Sidebar - Brand -->
        <a
          class="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">قسط شاپ</div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <!-- Nav Item - Dashboard -->
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/panel">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>مدیریت</span>
          </router-link>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Nav Item - Pages Collapse Menu -->
        <li class="nav-item">
          <router-link
            class="nav-link collapsed"
            to="/admin/requests"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i class="fas fa-fw fa-cog"></i>
            <span>اعتبار سنجی</span>
          </router-link>
          <div
            id="collapseTwo"
            class="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div class="bg-white py-2 collapse-inner rounded">
              <h6 class="collapse-header">Custom Components:</h6>
              <a class="collapse-item" href="buttons.html">Buttons</a>
              <a class="collapse-item" href="cards.html">Cards</a>
            </div>
          </div>
        </li>

        <!-- Nav Item - Utilities Collapse Menu -->
        <!-- <li class="nav-item">
          <router-link
            class="nav-link collapsed"
            to="/admin/requests/verified"
            aria-expanded="true"
            aria-controls="collapseUtilities"
          >
            <i class="fas fa-fw fa-wrench"></i>
            <span>درخواست های تایید شده</span>
          </router-link>
        </li> -->

        <!-- Nav Item - Pages Collapse Menu -->
        <!-- <li class="nav-item">
          <router-link
            class="nav-link collapsed"
            to="/admin/requests/failed"
            aria-expanded="true"
            aria-controls="collapsePages"
          >
            <i class="fas fa-fw fa-folder"></i>
            <span>درخواست های رد شده</span>
          </router-link>
        </li> -->

        <!-- Nav Item - Charts -->

        <!-- Nav Item - Tables -->

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block" />

        <!-- Sidebar Toggler (Sidebar) -->
      </ul>
</template>

<style scoped>
@import url("../../assets/css/sb-admin-2.min.css");
</style>