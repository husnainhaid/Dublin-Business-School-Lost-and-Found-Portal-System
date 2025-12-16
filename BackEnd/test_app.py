"""
Test suite for the DBS Lost and Found Portal System
"""
import  pytest # pyright: ignore[reportMissingImports]/ 
from app import app
from database import get_db, create_tables

class TestApp:
    """Test cases for the Flask application"""
    
    @pytest.fixture
    def client(self):
        """Create a test client for the Flask app"""
        app.config['TESTING'] = True
        with app.test_client() as client:
            yield client
    
    def test_app_exists(self):
        """Test that the app instance exists"""
        assert app is not None
    
    def test_app_is_testing(self, client):
        """Test that the app is in testing mode"""
        assert app.config['TESTING'] == True


class TestDatabase:
    """Test cases for database operations"""
    
    def test_database_connection(self):
        """Test that database connection can be established"""
        conn = get_db()
        assert conn is not None
        conn.close()
    
    def test_database_initialization(self):
        """Test that database can be initialized"""
        try:
            create_tables()
            assert True
        except Exception as e:
            pytest.fail(f"Database initialization failed: {str(e)}")


class TestBasicFunctionality:
    """Test basic Python functionality"""
    
    def test_addition(self):
        """Test basic addition"""
        assert 1 + 1 == 2
    
    def test_string_operations(self):
        """Test string operations"""
        assert "DBS".lower() == "dbs"
        assert "lost".upper() == "LOST"
    
    def test_list_operations(self):
        """Test list operations"""
        items = [1, 2, 3]
        assert len(items) == 3
        assert 2 in items

#PS C:\Users\Husnain\Downloads\Dublin Business School Lost and found Poratl System\BackEnd> py -m pytest test_app.py -v
#========================================================================================== test session starts ==========================================================================================
#platform win32 -- Python 3.13.7, pytest-9.0.2, pluggy-1.6.0 -- C:\Users\Husnain\AppData\Local\Programs\Python\Python313\python.exe
#cachedir: .pytest_cache
#rootdir: C:\Users\Husnain\Downloads\Dublin Business School Lost and found Poratl System\BackEnd
#collected 7 items                                                                                                                                                                                        

#test_app.py::TestApp::test_app_exists PASSED                                                                                                                                                       [ 14%] 
#test_app.py::TestApp::test_app_is_testing PASSED                                                                                                                                                   [ 28%] 
#test_app.py::TestDatabase::test_database_connection PASSED                                                                                                                                         [ 42%] 
#test_app.py::TestDatabase::test_database_initialization PASSED                                                                                                                                     [ 57%] 
#test_app.py::TestBasicFunctionality::test_addition PASSED                                                                                                                                          [ 71%] 
#test_app.py::TestBasicFunctionality::test_string_operations PASSED                                                                                                                                 [ 85%] 
#test_app.py::TestBasicFunctionality::test_list_operations PASSED 